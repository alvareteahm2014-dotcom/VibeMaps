/* VibeMaps · lógica de la app (PWA) */
'use strict';

/* =====================================================================
   1) Utilidades y estado
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DIA = 86400000;
const VERSION = 'v1.1.0';

const DEF = { lang: null, ciudad: null, usuario: null, plan: 'free', premiumUntil: 0, cancelado: false, ajustes: { momento: 'ahora', tema: 'auto' }, favs: [], reservas: [], pos: null, consent: false, onboarded: false };
let S = cargar();
usarCiudad(S.ciudad || CIUDAD_DEF);
const nombreCiudad = () => t('city.' + CIUDAD.id);
const localAny = id => Object.values(CIUDADES).flatMap(c => c.locales).find(v => v.id === id);
function cargar() {
  try {
    const raw = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || 'null');
    if (raw && typeof raw === 'object') return Object.assign({}, DEF, raw, { ajustes: Object.assign({}, DEF.ajustes, raw.ajustes || {}) });
  } catch (e) { /* almacenamiento no disponible */ }
  return JSON.parse(JSON.stringify(DEF));
}
function guardar() { try { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(S)); } catch (e) { /* ignorar */ } }

/* Estado volátil (no se guarda) */
const V_ = { vista: 'map', sheet: null, filtro: 'todos', ocup: {}, factor: {}, resumenAbierto: true, installEvt: null };
let map = null, tiles = null, lienzo = null;
const capas = {};

const URL_TILES = { dark: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', light: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}' };

/* =====================================================================
   2) Plan y suscripción (gratis / premium)
   ===================================================================== */
function refrescarPlan() {
  if (S.plan !== 'premium') return;
  const now = Date.now();
  let guard = 0;
  while (S.premiumUntil < now && guard++ < 60) {
    if (S.cancelado) { S.plan = 'free'; S.cancelado = false; S.premiumUntil = 0; break; }
    S.premiumUntil += 30 * DIA; // renovación mensual simulada
  }
  guardar();
}
const esPremium = () => S.plan === 'premium';
function activarPremium() { S.plan = 'premium'; S.premiumUntil = Date.now() + 30 * DIA; S.cancelado = false; guardar(); }
function irAPago(onDemo) {
  if (CONFIG.STRIPE_PAYMENT_LINK) { window.location.href = CONFIG.STRIPE_PAYMENT_LINK; return; }
  activarPremium(); if (onDemo) onDemo();
}
const precioTxt = () => t('plan.price');
const fechaTxt = ms => new Date(ms).toLocaleDateString(localeTag(), { day: 'numeric', month: 'long', year: 'numeric' });

/* =====================================================================
   3) Momento del día y tema
   ===================================================================== */
const esNocheAhora = () => { const h = new Date().getHours(); return h >= 20 || h < 7; };
const momento = () => S.ajustes.momento === 'ahora' ? (esNocheAhora() ? 'noche' : 'dia') : S.ajustes.momento;
const tema = () => S.ajustes.tema === 'auto' ? (momento() === 'noche' ? 'dark' : 'light') : S.ajustes.tema;
const abierto = v => v.franja === 'ambos' || v.franja === momento();
function semilla(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; let a = h >>> 0; a += 0x6D2B79F5; let r = Math.imul(a ^ a >>> 15, 1 | a); r ^= r + Math.imul(r ^ r >>> 7, 61 | r) ^ r; return ((r ^ r >>> 14) >>> 0) / 4294967296; }; }
function gauss(rng) { const u = 1 - rng(), v = rng(); const m = Math.sqrt(-2 * Math.log(u)); return [m * Math.cos(2 * Math.PI * v), m * Math.sin(2 * Math.PI * v)]; }

/* =====================================================================
   4) Motor de afinidad: tu perfil frente al perfil medio de un sitio
   ===================================================================== */
const zonaDe = v => ZONAS.find(z => z.id === v.zona);
function norm(dist, k) { const max = Math.max(...Object.values(dist)) || 1; return (dist[k] || 0) / max; }
function nivel(m) { return m >= 70 ? 'alta' : m >= 40 ? 'media' : 'baja'; }
function calcMatch(u, p) {
  if (!u) return 50;
  const edad = 1 - Math.min(Math.abs((+u.edad || 28) - p.edadMedia) / 14, 1);
  const est = norm(p.estilos, u.estilo);
  const sec = norm(p.sectores, u.sector);
  let nac;
  if (u.nac === 'ES') nac = Math.min(1, (100 - p.internacional) / 100 * 1.15);
  else if ((p.top || []).includes(u.nac)) nac = 1;
  else nac = Math.min(1, p.internacional / 100 * 1.6);
  const amb = u.ambientes && u.ambientes.length ? u.ambientes.reduce((a, k) => a + norm(p.ambientes, k), 0) / u.ambientes.length : .6;
  const mus = u.musicas && u.musicas.length ? Math.max(...u.musicas.map(k => norm(p.musicas, k))) : .6;
  const s = .25 * edad + .32 * est + .15 * sec + .08 * nac + .10 * amb + .10 * mus;
  const contraste = .5 + (s - .5) * 1.25;
  return clamp(Math.round(contraste * 100), 8, 96);
}
function topKeys(dist, n) { return Object.entries(dist).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]); }
function lista(arr) { return arr.join(t('and')); }
function motivos(u, p) {
  if (!u) return [];
  const d = Math.abs(u.edad - p.edadMedia);
  const topE = topKeys(p.estilos, 1)[0], topS = topKeys(p.sectores, 2), mus = topKeys(p.musicas, 2);
  const lc = s => s.toLowerCase();
  return [
    { ok: d <= 5, t: d <= 5 ? t('r.age_close', { n: p.edadMedia }) : t('r.age_diff', { n: p.edadMedia, d }) },
    { ok: topE === u.estilo || norm(p.estilos, u.estilo) >= .6, t: t('r.style', { s: lc(t('o.estilo.' + topE)) }) },
    { ok: topS.includes(u.sector), t: t('r.sector', { s: lista(topS.map(k => lc(t('o.sector.' + k)))) }) },
    { ok: (u.musicas || []).some(m => mus.includes(m)), t: t('r.music', { m: lista(mus.map(k => lc(t('o.musica.' + k)))) }) }
  ];
}
function perfilLocal(v) {
  const z = zonaDe(v), p = z.perfil;
  const d = { club: -2, sala: -1, cocktail: 2, rooftop: 2, bar: 0, terraza: 1, parque: 1 }[v.tipo] || 0;
  const est = Object.assign({}, p.estilos);
  if (v.precio.length === 3) { est.arreglado *= 1.35; est.pijo *= 1.35; }
  if (v.precio.length === 1) { est.rollo *= 1.2; est.casual *= 1.2; }
  const mus = Object.assign({}, p.musicas); v.musica.forEach(m => { mus[m] = (mus[m] || 0) * 1.8 + 10; });
  const amb = Object.assign({}, p.ambientes); amb[v.ambiente] = (amb[v.ambiente] || 0) * 1.5 + 12;
  return Object.assign({}, p, { edadMedia: p.edadMedia + d, estilos: est, musicas: mus, ambientes: amb });
}
function personasZona(z) { return Math.round(z.base * z.actividad[momento()] * (V_.factor[z.id] || 1)); }
function estadoZona(z) {
  const match = calcMatch(S.usuario, z.perfil), personas = personasZona(z);
  let niv = nivel(match);
  if (niv === 'baja' && personas < 220) niv = 'gris'; // rojo solo si hay mucha gente
  return { match, nivel: niv, personas, etiqueta: t('lvl.' + niv) };
}
function ocupacion(v) { return V_.ocup[v.id] != null ? V_.ocup[v.id] : .5; }
function estadoLocal(v) {
  const perfil = perfilLocal(v), match = calcMatch(S.usuario, perfil), ab = abierto(v), o = ab ? ocupacion(v) : 0;
  return { match, nivel: nivel(match), personas: Math.round(v.aforo * o), ocup: o, abierto: ab, perfil, etiqueta: t('lvl.' + nivel(match)) };
}
function compatGlobal() { let w = 0, s = 0; ZONAS.forEach(z => { const e = estadoZona(z); w += e.personas; s += e.personas * e.match; }); return w ? Math.round(s / w) : 0; }
function reseedOcupacion() {
  ZONAS.forEach(z => { V_.factor[z.id] = 1; });
  LOCALES.forEach(v => { const r = semilla(v.id + momento())(); V_.ocup[v.id] = clamp(.35 + r * .55, .1, .98); });
}
function tick() {
  LOCALES.forEach(v => { V_.ocup[v.id] = clamp((V_.ocup[v.id] || .5) + (Math.random() - .5) * .05, .08, .99); });
  ZONAS.forEach(z => { V_.factor[z.id] = clamp((V_.factor[z.id] || 1) + (Math.random() - .5) * .04, .85, 1.15); });
  refrescarVivo();
}

/* =====================================================================
   5) Piezas de interfaz reutilizables
   ===================================================================== */
const ICO = {
  mapa: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>',
  explorar: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  radar: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><path d="M12 12 18 6"/></svg>',
  fav: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z"/></svg>',
  perfil: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.200-4 4.200-6 8-6s6.800 2 8 6"/></svg>',
  candado: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  sol: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/></svg>',
  luna: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500Z"/></svg>',
  mira: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  pin: '<svg viewBox="0 0 32 32" width="30" height="30"><path d="M16 30c6-7 10-12 10-17A10 10 0 0 0 6 13c0 5 4 10 10 17Z" fill="#F5B700"/><circle cx="16" cy="13" r="3.600" fill="#0A0A0D"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
};

function anillo(pct, color, size = 74, grosor = 7) {
  const r = (size - grosor) / 2, c = 2 * Math.PI * r;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}2E" stroke-width="${grosor}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${grosor}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
}
function donut(mujer) {
  const r = 30, c = 2 * Math.PI * r, m = c * mujer / 100;
  return `<svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--sup2)" stroke-width="12"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--brand)" stroke-width="12" stroke-dasharray="${m} ${c - m}" transform="rotate(-90 42 42)"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="#6C8CFF" stroke-width="12" stroke-dasharray="${c - m} ${m}" stroke-dashoffset="${-m}" transform="rotate(-90 42 42)"/></svg>`;
}
function barras(arr, fmt) {
  const max = Math.max(...arr.map(x => x[1])) || 1;
  return `<div class="barras">${arr.map(([k, v]) => `<div class="barra-h ${v === max ? 'top' : ''}"><span>${esc(fmt ? fmt(k) : k)}</span><i><b style="width:${Math.round(v / max * 100)}%"></b></i><em>${Math.round(v)}%</em></div>`).join('')}</div>`;
}
function htmlGente(p) {
  const edades = Object.entries(p.edades);
  const estilos = Object.entries(p.estilos).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const sectores = Object.entries(p.sectores).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const sumE = estilos.reduce((a, x) => a + x[1], 0) || 1;
  return `<div class="gente">
    <div class="g-fila"><div class="g-kpi"><b>${p.edadMedia}</b><span>${t('z.avg_age')}</span></div>
      <div class="g-donut">${donut(p.sexo.mujer)}<div class="leyenda"><span><i style="background:var(--brand)"></i>${t('z.women')} ${p.sexo.mujer}%</span><span><i style="background:#6C8CFF"></i>${t('z.men')} ${p.sexo.hombre}%</span></div></div></div>
    <h5>${t('z.ages')}</h5>${barras(edades)}
    <h5>${t('z.styles')}</h5>${barras(estilos.map(([k, v]) => [k, v / sumE * 100]), k => t('o.estilo.' + k))}
    <h5>${t('z.sectors')}</h5>${barras(sectores, k => t('o.sector.' + k))}
    <h5>${t('z.nat')}</h5><div class="chips-fijos">${p.top.map(c => `<span class="tag">${esc(nombrePais(c))}</span>`).join('')}<span class="tag suave">${t('z.intl', { n: p.internacional })}</span></div>
    <div class="chips-fijos" style="margin-top:10px">${p.tags.map(k => `<span class="tag oro">${esc(t(k))}</span>`).join('')}</div>
  </div>`;
}
function toast(msg, ms = 2600) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('on');
  clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('on'), ms);
}
function abrirModal(html, cls = '') {
  const m = $('#modal'); m.innerHTML = `<div class="modal-bg" data-accion="cerrar-modal"></div><div class="modal-card ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  m.classList.remove('hidden');
}
function cerrarModal() { const m = $('#modal'); m.classList.add('hidden'); m.innerHTML = ''; }
function confirmar(texto, onYes) {
  abrirModal(`<p class="conf-txt">${esc(texto)}</p><div class="fila-btn"><button class="btn sec" data-accion="cerrar-modal">${t('cancel')}</button><button class="btn" data-accion="confirmar-si">${t('yes')}</button></div>`, 'chica');
  confirmar._f = onYes;
}

/* =====================================================================
   6) Onboarding: idioma, bienvenida, perfil, ubicación y plan
   ===================================================================== */
const PASOS_PERFIL = ['p1', 'p2', 'p3', 'p4'];
let OB = { paso: 'lang', edit: false, error: '', locMsg: '' };
let F = nuevoF();
function nuevoF() { return { email: '', nombre: '', edad: '', sexo: '', nac: 'ES', oficio: '', sector: '', estilo: '', ambientes: [], musicas: [] }; }
const CAMPO_MULTI = { ambientes: true, musicas: true };

function detectarIdioma() { const l = (navigator.language || 'es').slice(0, 2).toLowerCase(); return I18N[l] ? l : 'es'; }
function chips(campo, ops, valor, prefijo) {
  return `<div class="chips">${ops.map(o => {
    const on = Array.isArray(valor) ? valor.includes(o) : valor === o;
    return `<button type="button" class="chip ${on ? 'on' : ''}" data-accion="chip" data-campo="${campo}" data-valor="${o}" aria-pressed="${on}">${esc(t(prefijo + o))}</button>`;
  }).join('')}</div>`;
}
function opcionesPais(sel) {
  const tag = localeTag();
  const orden = PAISES.slice().sort((a, b) => nombrePais(a).localeCompare(nombrePais(b), tag));
  orden.push('XX');
  return orden.map(c => `<option value="${c}" ${c === sel ? 'selected' : ''}>${esc(nombrePais(c))}</option>`).join('');
}
function obCabecera() {
  const i = PASOS_PERFIL.indexOf(OB.paso);
  const atras = OB.paso === 'welcome' ? 'lang' : i > 0 ? PASOS_PERFIL[i - 1] : (OB.paso === 'p1' ? (OB.edit ? null : 'welcome') : OB.paso === 'loc' ? 'p4' : OB.paso === 'plan' ? 'loc' : null);
  const prog = i >= 0 ? `<div class="prog">${PASOS_PERFIL.map((_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('')}</div><div class="paso-txt">${t('step.of', { n: i + 1, total: PASOS_PERFIL.length })}</div>` : '';
  return `<div class="ob-top">${atras || (OB.edit && OB.paso === 'p1') ? `<button class="icon-btn" data-accion="ob-atras" aria-label="${t('back')}">‹</button>` : '<span></span>'}${prog ? '' : ''}</div>${prog}`;
}
function obRender() {
  const el = $('#onboarding'); const s = OB.paso; let body = '';
  const err = OB.error ? `<div class="err" role="alert">${esc(OB.error)}</div>` : '';
  if (s === 'lang') {
    body = `<div class="logo">${ICO.pin}<span>VibeMaps</span></div>
      <h1>${t('lang.title')}</h1><p class="sub">${I18N.es['lang.title']} · ${I18N.en['lang.title']} · ${I18N.fr['lang.title']}</p>
      <div class="langs">${LANGS.map(l => `<button class="lang ${LANG === l.id ? 'on' : ''}" data-accion="elegir-idioma" data-valor="${l.id}"><b>${l.code}</b><span>${l.nombre}</span></button>`).join('')}</div>
      <p class="mini">${t('lang.sub')}</p>
      <button class="btn grande" data-accion="ob-ir" data-valor="welcome">${t('continue')}</button>`;
  } else if (s === 'welcome') {
    body = `${obCabecera()}<div class="hero">${ICO.pin}</div><h1>${t('welcome.title')}</h1><p class="sub">${t('welcome.sub')}</p>
      <ul class="ventajas"><li><i style="background:${COLOR.alta}"></i>${t('welcome.b1')}</li><li><i style="background:${COLOR.media}"></i>${t('welcome.b2')}</li><li><i style="background:${COLOR.baja}"></i>${t('welcome.b3')}</li></ul>
      <button class="btn grande" data-accion="ob-ir" data-valor="p1">${t('welcome.cta')}</button>`;
  } else if (s === 'p1') {
    body = `${obCabecera()}<h1>${t('s1.title')}</h1><p class="sub">${t('s1.sub')}</p>
      <label class="campo"><span>${t('f.name')}</span><input data-f="nombre" value="${esc(F.nombre)}" autocomplete="given-name" maxlength="40"></label>
      <label class="campo"><span>${t('f.email')}</span><input data-f="email" type="email" inputmode="email" value="${esc(F.email)}" autocomplete="email" ${OB.edit ? '' : ''}></label>${err}
      <button class="btn grande" data-accion="ob-sig">${t('continue')}</button>`;
  } else if (s === 'p2') {
    body = `${obCabecera()}<h1>${t('s2.title')}</h1><p class="sub">${t('s2.sub')}</p>
      <label class="campo"><span>${t('f.age')}</span><input data-f="edad" type="number" inputmode="numeric" min="18" max="99" value="${esc(F.edad)}"></label>
      <div class="campo"><span>${t('f.sex')}</span>${chips('sexo', OPCIONES.sexo, F.sexo, 'sex.')}</div>
      <label class="campo"><span>${t('f.nat')}</span><select data-f="nac">${opcionesPais(F.nac)}</select></label>${err}
      <button class="btn grande" data-accion="ob-sig">${t('continue')}</button>`;
  } else if (s === 'p3') {
    body = `${obCabecera()}<h1>${t('s3.title')}</h1><p class="sub">${t('s3.sub')}</p>
      <label class="campo"><span>${t('f.job')}</span><input data-f="oficio" value="${esc(F.oficio)}" placeholder="${esc(t('f.job.ph'))}" maxlength="60"></label>
      <div class="campo"><span>${t('f.sector')}</span>${chips('sector', OPCIONES.sectores, F.sector, 'o.sector.')}</div>${err}
      <button class="btn grande" data-accion="ob-sig">${t('continue')}</button>`;
  } else if (s === 'p4') {
    body = `${obCabecera()}<h1>${t('s4.title')}</h1><p class="sub">${t('s4.sub')}</p>
      <div class="campo"><span>${t('f.style')}</span>${chips('estilo', OPCIONES.estilos, F.estilo, 'o.estilo.')}</div>
      <div class="campo"><span>${t('f.ambient')} <em>${t('f.optional')}</em></span>${chips('ambientes', OPCIONES.ambientes, F.ambientes, 'o.ambiente.')}</div>
      <div class="campo"><span>${t('f.music')} <em>${t('f.optional')}</em></span>${chips('musicas', OPCIONES.musicas, F.musicas, 'o.musica.')}</div>${err}
      <button class="btn grande" data-accion="ob-sig">${OB.edit ? t('save') : t('continue')}</button>`;
  } else if (s === 'loc') {
    body = `${obCabecera()}<div class="hero">${ICO.mira}</div><h1>${t('loc.title')}</h1><p class="sub">${t('loc.sub')}</p>
      <label class="check"><input type="checkbox" id="chk-consent" ${S.consent ? 'checked' : ''}><span>${t('loc.consent')}</span></label>
      <button class="link" data-accion="ver-privacidad">${t('loc.read')}</button>
      ${OB.locMsg ? `<div class="aviso">${esc(OB.locMsg)}</div>` : ''}${err}
      <button class="btn grande" data-accion="ob-ubicacion">${t('loc.enable')}</button>
      <button class="btn sec grande" data-accion="ob-ir" data-valor="plan">${t('loc.skip')}</button>`;
  } else if (s === 'plan') {
    body = `${obCabecera()}<h1>${t('plan.title')}</h1><p class="sub">${t('plan.sub')}</p>
      <div class="planes">
        <div class="plan">
          <div class="plan-h"><b>${t('plan.free')}</b><span>${t('plan.free.price')}</span></div>
          <ul><li>${ICO.check}${t('plan.free.f1')}</li><li>${ICO.check}${t('plan.free.f2')}</li><li>${ICO.check}${t('plan.free.f3')}</li><li class="no">${ICO.candado}${t('plan.free.no')}</li></ul>
          <button class="btn sec" data-accion="ob-plan-free">${t('plan.cta.free')}</button>
        </div>
        <div class="plan prem">
          <span class="ribbon">${t('plan.popular')}</span>
          <div class="plan-h"><b>${t('plan.premium')}</b><span>${t('plan.price')}</span></div>
          <ul><li>${ICO.check}${t('plan.prem.f0')}</li><li>${ICO.check}${t('plan.prem.f1')}</li><li>${ICO.check}${t('plan.prem.f2')}</li><li>${ICO.check}${t('plan.prem.f3')}</li><li>${ICO.check}${t('plan.prem.f4')}</li></ul>
          <button class="btn" data-accion="ob-plan-prem">${t('plan.cta.premium')}</button>
        </div>
      </div><p class="mini">${t('plan.cancel')}</p>`;
  }
  el.innerHTML = `<div class="ob-wrap">${body}</div>`;
  el.scrollTop = 0;
}
function obIr(p) { OB.paso = p; OB.error = ''; OB.locMsg = ''; obRender(); }
function obValidar(p) {
  const f = F;
  if (p === 'p1') {
    if (!f.nombre.trim()) return t('err.name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return t('err.email');
  } else if (p === 'p2') {
    if (!(+f.edad >= 18 && +f.edad <= 99)) return t('err.age');
    if (!f.sexo) return t('err.sex');
  } else if (p === 'p3') {
    if (!f.oficio.trim()) return t('err.job');
    if (!f.sector) return t('err.sector');
  } else if (p === 'p4') {
    if (!f.estilo) return t('err.style');
  }
  return '';
}
function obSiguiente() {
  const e = obValidar(OB.paso);
  if (e) { OB.error = e; obRender(); return; }
  const i = PASOS_PERFIL.indexOf(OB.paso);
  if (i < PASOS_PERFIL.length - 1) { obIr(PASOS_PERFIL[i + 1]); return; }
  /* último paso del perfil */
  S.usuario = Object.assign({}, F, { nombre: F.nombre.trim(), email: F.email.trim(), oficio: F.oficio.trim(), edad: +F.edad });
  guardar();
  if (OB.edit) { OB.edit = false; entrarApp(); toast(t('toast.saved')); return; }
  obIr('loc');
}
function obAtras() {
  const p = OB.paso, i = PASOS_PERFIL.indexOf(p);
  if (OB.edit && p === 'p1') { OB.edit = false; entrarApp(); mostrarVista('profile'); return; }
  if (p === 'welcome') return obIr('lang');
  if (p === 'p1') return obIr('welcome');
  if (i > 0) return obIr(PASOS_PERFIL[i - 1]);
  if (p === 'loc') return obIr('p4');
  if (p === 'plan') return obIr('loc');
}
function pedirUbicacion(cb) {
  if (!navigator.geolocation) { cb('unsupported'); return; }
  navigator.geolocation.getCurrentPosition(p => { S.pos = { lat: p.coords.latitude, lng: p.coords.longitude, t: Date.now() }; guardar(); cb('ok'); }, () => cb('denied'), { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
}
function obUbicacion() {
  const chk = $('#chk-consent');
  S.consent = !!(chk && chk.checked); guardar();
  if (!S.consent) { OB.error = t('loc.need_consent'); obRender(); return; }
  pedirUbicacion(r => {
    if (r === 'ok') { const c = ciudadMasCercana(S.pos); if (c.km <= 60) { S.ciudad = c.id; usarCiudad(c.id); guardar(); } toast(t('loc.ok')); obIr('plan'); }
    else { OB.error = ''; OB.locMsg = t(r === 'unsupported' ? 'loc.unsupported' : 'loc.denied'); obRender(); }
  });
}
function finalizarOnboarding() { S.onboarded = true; guardar(); entrarApp(); setTimeout(() => toast(t('toast.hello', { name: S.usuario.nombre })), 700); }

/* =====================================================================
   7) Arranque de la app
   ===================================================================== */
function aplicarTema() {
  const tm = tema();
  document.documentElement.dataset.theme = tm;
  const mt = $('meta[name=theme-color]'); if (mt) mt.content = tm === 'dark' ? '#0A0A0D' : '#F5F4EF';
  if (tiles) tiles.setUrl(URL_TILES[tm]);
}
function entrarApp() {
  refrescarPlan();
  $('#onboarding').classList.add('hidden'); $('#app').classList.remove('hidden');
  aplicarTema(); pintarNav(); actualizarSelectores();
  if (!V_._sim) { reseedOcupacion(); V_._sim = true; }
  initMapa();
  setTimeout(() => map.invalidateSize(), 60);
  pintarMapa(); pintarYo();
  mostrarVista(V_.vista === 'map' ? 'map' : V_.vista);
  if (!V_._reloj) {
    V_._reloj = setInterval(tick, 5000);
    V_._ultimo = momento();
    setInterval(() => { if (S.ajustes.momento === 'ahora' && momento() !== V_._ultimo) { V_._ultimo = momento(); cambioMomento(); } }, 60000);
  }
}
function mostrarOnboarding(paso) {
  $('#app').classList.add('hidden'); $('#onboarding').classList.remove('hidden');
  OB = { paso, edit: false, error: '', locMsg: '' }; obRender();
}
function pintarNav() {
  const it = [['map', ICO.mapa, 'nav.map'], ['explore', ICO.explorar, 'nav.explore'], ['radar', ICO.radar, 'nav.radar'], ['favs', ICO.fav, 'nav.favs'], ['profile', ICO.perfil, 'nav.profile']];
  $('#nav').innerHTML = it.map(([v, ico, k]) => `<button class="nav-b ${v === 'radar' ? 'centro' : ''} ${V_.vista === v ? 'on' : ''}" data-accion="ir-vista" data-valor="${v}" aria-label="${t(k)}">${ico}<span>${t(k)}</span></button>`).join('');
}
function mostrarVista(v) {
  V_.vista = v;
  $$('.view').forEach(el => el.classList.toggle('hidden', el.id !== 'view-' + v));
  $$('.nav-b').forEach(b => b.classList.toggle('on', b.dataset.valor === v));
  if (v === 'map') setTimeout(() => map && map.invalidateSize(), 40);
  pintarVistaActual();
}
function pintarVistaActual() {
  const v = V_.vista, el = $('#view-' + v), sc = el ? el.scrollTop : 0;
  if (v === 'explore') pintarExplorar(); else if (v === 'radar') pintarRadar(); else if (v === 'favs') pintarFavs(); else if (v === 'profile') pintarPerfil(); else pintarResumenMapa();
  if (el) el.scrollTop = sc;
}
function actualizarSelectores() {
  const m = S.ajustes.momento;
  $('#sel-momento').innerHTML = ['ahora', 'noche', 'dia'].map(k => `<option value="${k}" ${m === k ? 'selected' : ''}>${t('mom.' + k)}</option>`).join('');
  $('#lbl-momento').textContent = t('mom.' + m);
  $('#sel-ciudad').innerHTML = Object.keys(CIUDADES).map(k => `<option value="${k}" ${CIUDAD.id === k ? 'selected' : ''}>${t('city.' + k)}</option>`).join('');
  $('#lbl-ciudad').textContent = nombreCiudad();
  $('#dot-momento').style.background = momento() === 'noche' ? 'var(--brand)' : 'var(--verde)';
  const b = $('#btn-tema'); b.innerHTML = tema() === 'dark' ? ICO.sol : ICO.luna; b.title = t('theme.' + S.ajustes.tema);
  $('#btn-centrar').title = t('map.locate');
  $('#pista-lock span').textContent = t('map.lock');
  $('#pista-zoom').textContent = t('map.zoom');
  $('#pista-lock').classList.toggle('hidden', esPremium());
}
function cambiarCiudad(id, centrar = true) {
  if (!CIUDADES[id] || id === CIUDAD.id) { actualizarSelectores(); return; }
  S.ciudad = id; guardar(); usarCiudad(id);
  if (V_.sheet) cerrarSheet();
  reseedOcupacion(); actualizarSelectores(); pintarMapa(); pintarVistaActual();
  if (map && centrar) map.flyTo(CIUDAD.centro, CIUDAD.zoom, { duration: .9 });
}
function cambioMomento() { aplicarTema(); actualizarSelectores(); reseedOcupacion(); pintarMapa(); pintarVistaActual(); if (V_.sheet) pintarSheet(); }
function renderTodo() {
  pintarNav(); actualizarSelectores(); pintarMapa(); pintarVistaActual(); if (V_.sheet) pintarSheet();
}
function refrescarVivo() {
  if (!$('#app') || $('#app').classList.contains('hidden')) return;
  pintarMapa();
  if (V_.vista === 'explore' || V_.vista === 'radar') pintarVistaActual();
  if (V_.sheet && V_.sheet.tipo === 'local') actualizarLiveSheet();
}

/* =====================================================================
   8) Mapa (Leaflet): manchas de gente, zonas y locales
   ===================================================================== */
function initMapa() {
  if (map) return;
  map = L.map('mapa', { zoomControl: false, attributionControl: false, preferCanvas: true, minZoom: 11, maxZoom: 18 });
  tiles = L.tileLayer(URL_TILES[tema()], { maxZoom: 19, maxNativeZoom: 16 }).addTo(map);
  L.control.attribution({ prefix: false, position: 'topright' }).addAttribution('© Esri · © OpenStreetMap contributors').addTo(map);
  lienzo = L.canvas({ padding: .5 });
  capas.calor = L.layerGroup().addTo(map); capas.puntos = L.layerGroup().addTo(map); capas.zonas = L.layerGroup().addTo(map);
  capas.locales = L.layerGroup(); capas.yo = L.layerGroup().addTo(map);
  map.setView(CIUDAD.centro, CIUDAD.zoom);
  map.on('zoomend', nivelZoom);
  nivelZoom();
}
function nivelZoom() {
  if (!map) return;
  const z = map.getZoom();
  $('#mapa').dataset.zl = z < 12 ? 'dot' : z < 14 ? 'mini' : 'full';
  const cerca = z >= 15;
  if (esPremium()) {
    if (cerca && !map.hasLayer(capas.locales)) capas.locales.addTo(map);
    if (!cerca && map.hasLayer(capas.locales)) map.removeLayer(capas.locales);
    $('#pista-zoom').classList.toggle('hidden', cerca);
  } else {
    if (map.hasLayer(capas.locales)) map.removeLayer(capas.locales);
    $('#pista-zoom').classList.add('hidden');
  }
}
function pintarMapa() {
  if (!map || !S.usuario) return;
  ['calor', 'puntos', 'zonas', 'locales'].forEach(k => capas[k].clearLayers());
  ZONAS.forEach(z => {
    const e = estadoZona(z), col = COLOR[e.nivel], tenue = e.nivel === 'gris';
    L.circle([z.lat, z.lng], { radius: z.radio * 1.05, stroke: false, fillColor: col, fillOpacity: tenue ? .04 : .10, interactive: false }).addTo(capas.calor);
    const rng = semilla(z.id), n = clamp(Math.round(e.personas / 4.5), 20, 160), dm = z.radio * .45;
    for (let i = 0; i < n; i++) {
      const [gx, gy] = gauss(rng);
      const lat = z.lat + gy * dm / 111320, lng = z.lng + gx * dm / (111320 * Math.cos(z.lat * Math.PI / 180));
      L.circleMarker([lat, lng], { renderer: lienzo, radius: 2.1, stroke: false, fillColor: col, fillOpacity: tenue ? .35 : .85, interactive: false }).addTo(capas.puntos);
    }
    const mk = L.marker([z.lat, z.lng], { zIndexOffset: 500, icon: L.divIcon({ className: 'nada', iconSize: [0, 0], html: `<div class="zpill ${e.nivel}"><b>${esc(z.nombre)}</b><span>${esc(e.etiqueta)}, ${e.match}%</span><em>${t('people.approx', { n: e.personas })}</em></div>` }) }).addTo(capas.zonas);
    mk.on('click', () => abrirZona(z.id));
  });
  if (esPremium()) {
    LOCALES.forEach(v => {
      if (!abierto(v)) return;
      const e = estadoLocal(v);
      const mk = L.marker([v.lat, v.lng], { zIndexOffset: 800, icon: L.divIcon({ className: 'nada', iconSize: [0, 0], html: `<div class="vpin ${e.nivel}"><i>${ICONO_TIPO[v.tipo]}</i><div><b>${esc(v.nombre)}</b><span>${esc(e.etiqueta)}</span><em>${e.match}%</em></div></div>` }) }).addTo(capas.locales);
      mk.on('click', () => abrirLocal(v.id));
    });
  }
  nivelZoom(); pintarResumenMapa();
}
function pintarYo() {
  if (!capas.yo) return;
  capas.yo.clearLayers();
  if (!S.pos) return;
  L.marker([S.pos.lat, S.pos.lng], { zIndexOffset: 100, interactive: false, icon: L.divIcon({ className: 'nada', iconSize: [16, 16], iconAnchor: [8, 8], html: '<div class="yo"></div>' }) }).addTo(capas.yo);
}
function distanciaKm(a, b) { const R = 6371, dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180; const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); }
function centrarEnMi() {
  if (!S.pos) { toast(t('map.nopos')); return; }
  if (distanciaKm(S.pos, { lat: CIUDAD.centro[0], lng: CIUDAD.centro[1] }) > 60) { toast(t('map.far', { city: nombreCiudad() })); return; }
  map.flyTo([S.pos.lat, S.pos.lng], 15, { duration: .8 });
}
function pintarResumenMapa() {
  const el = $('#resumen-mapa'); if (!el || !S.usuario) return;
  const m = momento(), zs = ZONAS.map(z => ({ z, e: estadoZona(z) }));
  const mejor = zs.slice().sort((a, b) => b.e.match - a.e.match)[0], caliente = zs.slice().sort((a, b) => b.e.personas - a.e.personas)[0];
  const total = zs.reduce((a, x) => a + x.e.personas, 0);
  const abiertos = LOCALES.filter(abierto).length;
  el.classList.toggle('cerrado', !V_.resumenAbierto);
  el.innerHTML = `<button class="rs-cab" data-accion="toggle-resumen" aria-expanded="${V_.resumenAbierto}"><b>${t('map.sum.title.' + m, { city: nombreCiudad() })}</b><span>${total.toLocaleString(localeTag())} ${t('map.sum.people')}${esPremium() ? ' · ' + t('map.sum.venues', { n: abiertos }) : ''}</span>${ICO.chev}</button>
    <div class="rs-cuerpo"><button class="rs-fila" data-accion="abrir-zona" data-id="${mejor.z.id}"><i style="background:${COLOR[mejor.e.nivel]}"></i><span>${t('map.sum.best')}</span><b>${esc(mejor.z.nombre)} · ${mejor.e.match}%</b></button>
    <button class="rs-fila" data-accion="abrir-zona" data-id="${caliente.z.id}"><i style="background:${COLOR[caliente.e.nivel]}"></i><span>${t('map.sum.hot')}</span><b>${esc(caliente.z.nombre)} · ≈${caliente.e.personas}</b></button></div>`;
}

/* =====================================================================
   9) Fichas de zona y de local
   ===================================================================== */
function abrirZona(id) { V_.sheet = { tipo: 'zona', id, tab: 'resumen' }; pintarSheet(); map && map.flyTo([zonaPorId(id).lat, zonaPorId(id).lng], Math.max(map.getZoom(), 14), { duration: .6 }); }
function abrirLocal(id, desdeZona) {
  if (!esPremium()) { abrirPaywall(); return; }
  V_.sheet = { tipo: 'local', id, tab: 'resumen', desde: desdeZona || null }; pintarSheet();
}
const zonaPorId = id => ZONAS.find(z => z.id === id);
const localPorId = id => LOCALES.find(v => v.id === id);
function cerrarSheet() { V_.sheet = null; const s = $('#sheet'); s.classList.remove('on'); $('#sheet-bg').classList.remove('on'); setTimeout(() => { if (!V_.sheet) s.innerHTML = ''; }, 250); }
function pintarSheet() {
  const sh = V_.sheet; if (!sh) return;
  const el = $('#sheet'); let html = '';
  if (sh.tipo === 'zona') html = htmlSheetZona(zonaPorId(sh.id));
  else html = htmlSheetLocal(localPorId(sh.id));
  const sc = el.querySelector('.sh-scroll') ? el.querySelector('.sh-scroll').scrollTop : 0;
  el.innerHTML = `<div class="grab"></div><button class="x" data-accion="cerrar-sheet" aria-label="${t('close')}">${ICO.x}</button><div class="sh-scroll">${html}</div>`;
  el.classList.add('on'); $('#sheet-bg').classList.add('on');
  const n = el.querySelector('.sh-scroll'); if (n) n.scrollTop = sc;
}
function tarjetaLocal(v) {
  const e = estadoLocal(v), z = zonaDe(v);
  return `<button class="tarjeta ${e.nivel} ${e.abierto ? '' : 'cerrado'}" data-accion="abrir-local" data-id="${v.id}" ${V_.sheet && V_.sheet.tipo === 'zona' ? `data-zona="${V_.sheet.id}"` : ''} style="--grad:${GRAD[v.tipo]}">
    <div class="foto">${ICONO_TIPO[v.tipo]}</div>
    <div class="t-cuerpo"><h3>${esc(v.nombre)}</h3>
      <div class="meta">${t('l.in', { tipo: t('tipo.' + v.tipo), zona: esc(z.nombre) })}${v.precio ? ', ' + v.precio : ''}${v.partner ? ` <span class="badge oro">${t('l.partner')}</span>` : ''}</div>
      <div class="barra"><i style="width:${Math.round(e.ocup * 100)}%"></i></div>
      <div class="mini">${textoEstado(v, e)}</div></div>
    <div class="badge-match">${e.match}%</div></button>`;
}
function textoEstado(v, e) { return e.abierto ? t('l.occ', { p: Math.round(e.ocup * 100), n: e.personas }) : t('l.closed', { h: v.horario.split(' ')[0] }); }
function bloqueLocales(z) {
  const abiertos = LOCALES.filter(v => v.zona === z.id && abierto(v));
  if (esPremium()) {
    const lista_ = abiertos.map(v => ({ v, e: estadoLocal(v) })).sort((a, b) => b.e.match - a.e.match);
    return `<h4>${t('z.venues')}</h4>${lista_.length ? lista_.map(x => tarjetaLocal(x.v)).join('') : `<p class="mini">${t('ex.empty')}</p>`}`;
  }
  if (!abiertos.length) return '';
  const cuenta = {}; abiertos.forEach(v => { cuenta[v.tipo] = (cuenta[v.tipo] || 0) + 1; });
  const tipos = Object.entries(cuenta).map(([k, n]) => `<span class="tag">${n} ${esc(t('tipo.' + k + (n > 1 ? '.p' : '')).toLowerCase())}</span>`).join('');
  return `<div class="bloqueo"><div class="bq-ico">${ICO.candado}</div><h4>${t('z.locked.title', { n: abiertos.length })}</h4><div class="chips-fijos centro">${tipos}</div>
    <div class="fantasma"><i></i><i></i><i></i></div><p>${t('z.locked.sub')}</p><button class="btn" data-accion="paywall">${t('z.locked.cta')}</button></div>`;
}
function htmlSheetZona(z) {
  const e = estadoZona(z), col = COLOR[e.nivel], mot = motivos(S.usuario, z.perfil);
  return `<div class="sh-cab ${e.nivel}"><div class="anillo">${anillo(e.match, col)}<b>${e.match}%</b></div>
    <div><h2>${esc(z.nombre)}</h2><span class="estado-pill" style="--c:${col}">${esc(e.etiqueta)}</span><div class="mini">${t('people.approx', { n: e.personas })}</div></div></div>
    <h4>${t('z.why')}</h4><ul class="motivos">${mot.map(m => `<li class="${m.ok ? 'ok' : 'no'}"><i>${m.ok ? '✓' : '–'}</i>${esc(m.t)}</li>`).join('')}</ul>
    <h4>${t('z.people')}</h4>${htmlGente(z.perfil)}
    ${bloqueLocales(z)}`;
}
function htmlSheetLocal(v) {
  const e = estadoLocal(v), z = zonaDe(v), col = COLOR[e.nivel], fav = S.favs.includes(v.id), tab = V_.sheet.tab;
  const mot = motivos(S.usuario, e.perfil);
  let cuerpo = '';
  if (tab === 'resumen') {
    cuerpo = `<div class="live-box"><div class="barra grande"><i id="lv-barra" style="width:${Math.round(e.ocup * 100)}%"></i></div><div class="mini" id="lv-txt">${textoEstado(v, e)}</div></div>
      <div class="datos"><div><span>${t('l.hours')}</span><b>${esc(v.horario)}</b></div>${v.precio ? `<div><span>${t('l.price')}</span><b>${v.precio}</b></div>` : ''}<div><span>${t('l.music')}</span><b>${esc(lista(v.musica.map(m => t('o.musica.' + m))))}</b></div><div><span>${t('l.capacity')}</span><b>${v.aforo}</b></div></div>
      <p class="desc">${esc((DESC[v.id] || {})[LANG] || '')}</p>
      <h4>${t('z.why')}</h4><ul class="motivos">${mot.map(m => `<li class="${m.ok ? 'ok' : 'no'}"><i>${m.ok ? '✓' : '–'}</i>${esc(m.t)}</li>`).join('')}</ul>`;
  } else if (tab === 'gente') {
    cuerpo = htmlGente(e.perfil);
  } else {
    const pr = PROMOTORES[v.id];
    if (v.partner && pr) {
      const tel = pr.tel.replace(/[^\d+]/g, ''), wa = tel.replace('+', '');
      cuerpo = `<div class="live-box"><h4 style="margin-top:0">${t('l.live')}</h4><div class="barra grande"><i id="lv-barra2" style="width:${Math.round(e.ocup * 100)}%"></i></div><div class="mini" id="lv-txt2">${textoEstado(v, e)}</div><div class="mini">${t('l.live.sub')}</div></div>
        <div class="promotor"><div class="avatar">${esc(pr.nombre[0])}</div><div><span>${t('l.promoter')}</span><b>${esc(pr.nombre)}</b></div></div>
        <div class="fila-btn"><a class="btn sec" href="https://wa.me/${wa}" target="_blank" rel="noopener">${t('l.whatsapp')}</a><a class="btn sec" href="tel:${tel}">${t('l.call')}</a><a class="btn sec" href="https://instagram.com/${pr.ig}" target="_blank" rel="noopener">${t('l.instagram')}</a></div>
        <p class="mini">${t('l.contact_demo')}</p>
        ${RESERVA_TIPOS[v.tipo].length ? `<button class="btn grande" data-accion="reservar" data-id="${v.id}">${t('r.title')}</button>` : ''}`;
    } else cuerpo = `<p class="mini">${t('l.nopartner')}</p>`;
  }
  return `${V_.sheet.desde ? `<button class="link atras" data-accion="abrir-zona" data-id="${V_.sheet.desde}">‹ ${t('l.back')}</button>` : ''}
    <div class="sh-cab ${e.nivel}"><div class="foto g" style="--grad:${GRAD[v.tipo]}">${ICONO_TIPO[v.tipo]}</div>
      <div style="min-width:0"><h2>${esc(v.nombre)}</h2><div class="mini">${t('l.in', { tipo: t('tipo.' + v.tipo), zona: esc(z.nombre) })}</div>
        <div class="fila-mini"><span class="estado-pill" style="--c:${col}">${esc(e.etiqueta)} · ${e.match}%</span>${v.partner ? `<span class="badge oro">${t('l.partner')}</span>` : ''}</div></div>
      <button class="fav-b ${fav ? 'on' : ''}" data-accion="fav" data-id="${v.id}" aria-label="${t(fav ? 'l.fav.del' : 'l.fav.add')}" aria-pressed="${fav}">${ICO.fav}</button></div>
    <div class="tabs">${[['resumen', 'tab.summary'], ['gente', 'tab.people'], ['reservar', 'tab.book']].map(([k, l]) => `<button class="tab ${tab === k ? 'on' : ''}" data-accion="tab" data-valor="${k}">${t(l)}</button>`).join('')}</div>
    <div class="tab-cuerpo">${cuerpo}</div>`;
}
function actualizarLiveSheet() {
  const sh = V_.sheet; if (!sh || sh.tipo !== 'local') return;
  const v = localPorId(sh.id), e = estadoLocal(v), w = Math.round(e.ocup * 100) + '%';
  [['#lv-barra', '#lv-txt'], ['#lv-barra2', '#lv-txt2']].forEach(([b, tx]) => { const be = $(b), te = $(tx); if (be) be.style.width = w; if (te) te.textContent = textoEstado(v, e); });
}

/* Reservas (solo Premium) */
function abrirReserva(id) {
  const v = localPorId(id); if (!v || !esPremium()) return;
  const pad = n => String(n).padStart(2, '0'), ahora = new Date(), [hh, mm] = (momento() === 'noche' ? '23:00' : '13:30').split(':').map(Number);
  let sug = new Date(); sug.setHours(hh, mm, 0, 0);
  if (sug.getTime() < ahora.getTime() + 30 * 60000) { sug = new Date(Math.ceil((ahora.getTime() + 30 * 60000) / 1800000) * 1800000); }
  const iso = `${sug.getFullYear()}-${pad(sug.getMonth() + 1)}-${pad(sug.getDate())}`, hora = `${pad(sug.getHours())}:${pad(sug.getMinutes())}`;
  const minIso = `${ahora.getFullYear()}-${pad(ahora.getMonth() + 1)}-${pad(ahora.getDate())}`;
  abrirModal(`<h3>${t('r.title')} · ${esc(v.nombre)}</h3>
    <div class="campo"><span>${t('r.type')}</span><div class="chips">${RESERVA_TIPOS[v.tipo].map((k, i) => `<button type="button" class="chip ${i === 0 ? 'on' : ''}" data-accion="r-tipo" data-valor="${k}">${t('r.t.' + k)}</button>`).join('')}</div></div>
    <div class="dos"><label class="campo"><span>${t('r.date')}</span><input id="r-fecha" type="date" min="${minIso}" value="${iso}"></label><label class="campo"><span>${t('r.time')}</span><input id="r-hora" type="time" value="${hora}"></label></div>
    <div class="dos"><label class="campo"><span>${t('r.guests')}</span><input id="r-pers" type="number" min="1" max="30" value="2" inputmode="numeric"></label><label class="campo"><span>${t('r.name')}</span><input id="r-nombre" value="${esc(S.usuario.nombre)}" maxlength="40"></label></div>
    <div class="err hidden" id="r-err">${t('r.err')}</div>
    <p class="mini">${t('r.demo')}</p>
    <div class="fila-btn"><button class="btn sec" data-accion="cerrar-modal">${t('cancel')}</button><button class="btn" data-accion="r-confirmar" data-id="${v.id}">${t('r.submit')}</button></div>`);
}
function confirmarReserva(id) {
  const v = localPorId(id), tipoBtn = $('#modal .chip.on'), f = $('#r-fecha').value, h = $('#r-hora').value, p = clamp(parseInt($('#r-pers').value, 10) || 1, 1, 30), n = $('#r-nombre').value.trim() || S.usuario.nombre;
  const cuando = f && h ? new Date(`${f}T${h}`) : null;
  if (!cuando || isNaN(cuando) || cuando.getTime() < Date.now() - 60000) { $('#r-err').classList.remove('hidden'); return; }
  S.reservas.push({ id: 'r' + Date.now(), local: v.id, tipo: tipoBtn ? tipoBtn.dataset.valor : RESERVA_TIPOS[v.tipo][0], cuando: cuando.getTime(), personas: p, nombre: n });
  guardar(); cerrarModal(); toast(t('toast.reserved'));
  if (V_.vista === 'profile') pintarPerfil();
}

/* Paywall y pago */
function abrirPaywall() {
  abrirModal(`<div class="pw-ico">${ICO.candado}</div><h3>${t('pw.title')}</h3><p class="sub">${t('pw.sub')}</p>
    <ul class="ventajas peq"><li>${ICO.check}${t('plan.prem.f1')}</li><li>${ICO.check}${t('plan.prem.f2')}</li><li>${ICO.check}${t('plan.prem.f3')}</li></ul>
    <button class="btn grande" data-accion="checkout">${t('pw.cta', { price: precioTxt() })}</button><button class="btn sec grande" data-accion="cerrar-modal">${t('pw.later')}</button>`, 'centro');
}
function abrirCheckout(origen) {
  abrirModal(`<h3>${t('ck.title')}</h3>
    <div class="ck-linea"><span>${t('ck.line')}</span><b>${precioTxt()}</b></div>
    <div class="ck-linea total"><span>${t('ck.total')}</span><b>${t('plan.price.short')}</b></div>
    <p class="mini">${t('ck.renew')}</p><div class="aviso">${t('ck.demo')}</div>
    <button class="btn grande" data-accion="ck-confirmar" data-origen="${origen || 'app'}">${CONFIG.STRIPE_PAYMENT_LINK ? t('ck.pay') : t('ck.confirm')}</button>
    <button class="btn sec grande" data-accion="cerrar-modal">${t('cancel')}</button>
    <p class="mini"><button class="link" data-accion="ver-terminos">${t('pf.terms')}</button></p>`);
}
function checkoutConfirmado(origen) {
  irAPago(() => {
    cerrarModal();
    if (origen === 'ob') finalizarOnboarding(); else { renderTodo(); cerrarSheet(); }
    toast(t('ck.success'), 3200);
  });
}

/* =====================================================================
   10) Vistas: Explorar, Radar, Favoritos, Perfil
   ===================================================================== */
function bloqueoVista(titulo, sub) {
  return `<div class="vacio bloqueo"><div class="bq-ico">${ICO.candado}</div><h3>${titulo}</h3><p>${sub}</p><div class="fantasma"><i></i><i></i><i></i></div><button class="btn" data-accion="paywall">${t('z.locked.cta')}</button></div>`;
}
function pintarExplorar() {
  const el = $('#view-explore'), f = V_.filtro, m = momento();
  const abiertos = LOCALES.filter(abierto);
  if (!esPremium()) {
    el.innerHTML = `<div class="seccion"><div><h2>${t('ex.title')}</h2><p class="sub">${t('ex.sub.' + m, { n: abiertos.length })}</p></div>${bloqueoVista(t('ex.locked.title'), t('ex.locked.sub', { n: abiertos.length, city: nombreCiudad() }))}</div>`;
    return;
  }
  const filtros = ['todos', 'parati', 'club', 'bar', 'terraza', 'partner'];
  let lst = abiertos.map(v => ({ v, e: estadoLocal(v) }));
  lst = lst.filter(({ v, e }) => f === 'todos' || (f === 'parati' && e.match >= 70) || (f === 'club' && v.tipo === 'club') || (f === 'bar' && ['bar', 'cocktail', 'rooftop', 'sala'].includes(v.tipo)) || (f === 'terraza' && ['terraza', 'parque'].includes(v.tipo)) || (f === 'partner' && v.partner));
  lst.sort((a, b) => b.e.match - a.e.match);
  el.innerHTML = `<div class="seccion"><div><h2>${t('ex.title')}</h2><p class="sub">${t('ex.sub.' + m, { n: abiertos.length })}</p></div>
    <div class="filtros">${filtros.map(k => `<button class="chip ${f === k ? 'on' : ''}" data-accion="filtro" data-valor="${k}">${t('ex.f.' + k)}</button>`).join('')}</div>
    ${lst.length ? lst.map(x => tarjetaLocal(x.v)).join('') : `<div class="vacio"><p>${t('ex.empty')}</p><button class="btn sec" data-accion="filtro" data-valor="todos">${t('ex.all')}</button></div>`}</div>`;
}
function pintarRadar() {
  const el = $('#view-radar'); if (!S.usuario) return;
  const zs = ZONAS.map(z => ({ z, e: estadoZona(z) })).sort((a, b) => b.e.match - a.e.match);
  const total = zs.reduce((a, x) => a + x.e.personas, 0), vibe = Math.round(zs.reduce((a, x) => a + x.e.personas * x.e.match / 100, 0));
  const g = compatGlobal(), col = COLOR[nivel(g)], mejor = zs[0];
  el.innerHTML = `<div class="seccion"><div><h2>${t('rd.title')}</h2><p class="sub">${t('rd.sub', { city: nombreCiudad() })}</p></div>
    <div class="radar-top"><div class="anillo grande">${anillo(g, col, 120, 11)}<b>${g}%</b></div><div><span class="mini">${t('rd.global')}</span><div class="vibe-n">≈${vibe.toLocaleString(localeTag())}</div><span class="mini">${t('rd.vibe')} ${t('rd.of', { n: total.toLocaleString(localeTag()) })}</span></div></div>
    <h4>${t('rd.ranking')}</h4><div class="ranking">${zs.map(({ z, e }) => `<button class="rk" data-accion="abrir-zona" data-id="${z.id}"><span>${esc(z.nombre)}</span><i><b style="width:${e.match}%;background:${COLOR[e.nivel]}"></b></i><em>${e.match}%</em></button>`).join('')}</div>
    <h4>${t('rd.best')} · ${esc(mejor.z.nombre)}</h4>${htmlGente(mejor.z.perfil)}</div>`;
}
function pintarFavs() {
  const el = $('#view-favs');
  if (!esPremium()) { el.innerHTML = `<div class="seccion"><div><h2>${t('fav.title')}</h2></div>${bloqueoVista(t('fav.locked.title'), t('fav.locked.sub'))}</div>`; return; }
  const lst = S.favs.map(localPorId).filter(Boolean);
  el.innerHTML = `<div class="seccion"><div><h2>${t('fav.title')}</h2><p class="sub">${t('fav.sub')}</p></div>${lst.length ? lst.map(tarjetaLocal).join('') : `<div class="vacio"><p>${t('fav.empty')}</p></div>`}</div>`;
}
function filaPerfil(txt, accion, extra = '') { return `<button class="fila-p" data-accion="${accion}" ${extra}><span>${txt}</span><i>›</i></button>`; }
function pintarPerfil() {
  const el = $('#view-profile'), u = S.usuario; if (!u) return;
  const prem = esPremium();
  const plan = prem
    ? `<div class="plan-card prem"><div><span class="mini">${t('pf.plan')}</span><h3>${t('pf.premium')}</h3><p class="mini">${S.cancelado ? t('pf.ends', { d: fechaTxt(S.premiumUntil) }) : t('pf.renews', { d: fechaTxt(S.premiumUntil) })}</p></div>${S.cancelado ? `<button class="btn" data-accion="reanudar">${t('pf.resume')}</button>` : `<button class="btn sec" data-accion="cancelar-sub">${t('pf.cancel')}</button>`}</div>`
    : `<div class="plan-card"><div><span class="mini">${t('pf.plan')}</span><h3>${t('pf.free')}</h3><p class="mini">${t('plan.free.no')}</p></div><button class="btn" data-accion="checkout">${t('pf.upgrade')} · ${t('plan.price.short')}</button></div>`;
  const res = !prem ? `<p class="mini">${t('pf.res.locked')}</p>` : S.reservas.length
    ? S.reservas.slice().sort((a, b) => a.cuando - b.cuando).map(r => { const v = localAny(r.local); return v ? `<div class="reserva"><div><b>${esc(v.nombre)}</b><span>${t('r.t.' + r.tipo)} · ${new Date(r.cuando).toLocaleString(localeTag(), { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} · ${t('pf.res.guests', { n: r.personas })}</span></div><button class="link" data-accion="borrar-reserva" data-id="${r.id}">${t('pf.res.cancel')}</button></div>` : ''; }).join('')
    : `<p class="mini">${t('pf.res.none')}</p>`;
  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent), standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const instalar = V_.installEvt ? filaPerfil(t('pf.install'), 'instalar') : (esIOS && !standalone ? `<p class="mini">${t('pf.install.ios')}</p>` : '');
  el.innerHTML = `<div class="seccion">
    <div class="perfil-cab"><div class="avatar g">${esc(u.nombre[0] || '?')}</div><div><h2>${esc(u.nombre)}</h2><p class="mini">${esc(u.oficio)} · ${esc(t('o.sector.' + u.sector))} · ${u.edad}</p><p class="mini">${esc(nombrePais(u.nac))} · ${esc(t('o.estilo.' + u.estilo))}</p></div></div>
    ${plan}
    <h4>${t('pf.language')}</h4><div class="chips">${LANGS.map(l => `<button class="chip ${LANG === l.id ? 'on' : ''}" data-accion="idioma" data-valor="${l.id}">${l.nombre}</button>`).join('')}</div>
    <h4>${t('pf.theme')}</h4><div class="chips">${['auto', 'dark', 'light'].map(k => `<button class="chip ${S.ajustes.tema === k ? 'on' : ''}" data-accion="set-tema" data-valor="${k}">${t('theme.' + k)}</button>`).join('')}</div>
    <h4>${t('pf.city')}</h4><div class="chips">${Object.keys(CIUDADES).map(k => `<button class="chip ${CIUDAD.id === k ? 'on' : ''}" data-accion="set-ciudad" data-valor="${k}">${t('city.' + k)}</button>`).join('')}</div>
    <h4>${t('pf.moment')}</h4><div class="chips">${['ahora', 'noche', 'dia'].map(k => `<button class="chip ${S.ajustes.momento === k ? 'on' : ''}" data-accion="set-momento" data-valor="${k}">${t('mom.' + k)}</button>`).join('')}</div>
    <h4>${t('pf.reservations')}</h4>${res}
    <h4>${t('pf.about')}</h4>
    <div class="lista-p">${filaPerfil(t('pf.edit'), 'editar-perfil')}
      ${S.pos ? filaPerfil(t('pf.loc.revoke'), 'revocar-ubicacion') : filaPerfil(t('pf.loc.enable'), 'activar-ubicacion')}
      ${instalar}${filaPerfil(t('pf.privacy'), 'ver-privacidad')}${filaPerfil(t('pf.terms'), 'ver-terminos')}${filaPerfil(t('pf.export'), 'exportar')}${filaPerfil(t('pf.delete'), 'borrar-todo')}</div>
    <div class="venues-cta"><b>${t('pf.venues')}</b><a class="btn sec" href="mailto:${CONFIG.CONTACTO}">${t('pf.venues.cta')}</a></div>
    <p class="mini centro-t">VibeMaps ${VERSION}</p></div>`;
}

/* =====================================================================
   11) Acciones (delegación de eventos)
   ===================================================================== */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-accion]'); if (!b) return;
  const a = b.dataset.accion, val = b.dataset.valor, id = b.dataset.id;
  switch (a) {
    /* onboarding */
    case 'elegir-idioma': S.lang = val; guardar(); setLangId(val); obRender(); break;
    case 'ob-ir': obIr(val); break;
    case 'ob-sig': obSiguiente(); break;
    case 'ob-atras': obAtras(); break;
    case 'ob-ubicacion': obUbicacion(); break;
    case 'ob-plan-free': finalizarOnboarding(); break;
    case 'ob-plan-prem': abrirCheckout('ob'); break;
    case 'chip': {
      const c = b.dataset.campo, v = b.dataset.valor;
      if (CAMPO_MULTI[c]) { const arr = F[c], i = arr.indexOf(v); i >= 0 ? arr.splice(i, 1) : arr.push(v); } else F[c] = v;
      OB.error = ''; obRender(); break;
    }
    /* navegación */
    case 'ir-vista': cerrarSheet(); mostrarVista(val); break;
    case 'toggle-resumen': V_.resumenAbierto = !V_.resumenAbierto; pintarResumenMapa(); break;
    case 'centrar': centrarEnMi(); break;
    case 'abrir-zona': mostrarVista('map'); abrirZona(id); break;
    case 'abrir-local': abrirLocal(id, b.dataset.zona); break;
    case 'cerrar-sheet': cerrarSheet(); break;
    case 'tab': V_.sheet.tab = val === 'reservar' ? 'reservar' : val; pintarSheet(); break;
    case 'filtro': V_.filtro = val; pintarExplorar(); break;
    case 'fav': {
      const i = S.favs.indexOf(id); if (i >= 0) { S.favs.splice(i, 1); toast(t('toast.fav.del')); } else { S.favs.push(id); toast(t('toast.fav.add')); }
      guardar(); pintarSheet(); if (V_.vista === 'favs') pintarFavs(); break;
    }
    /* reservas y pago */
    case 'reservar': abrirReserva(id); break;
    case 'r-tipo': $$('#modal .chip').forEach(c => c.classList.toggle('on', c === b)); break;
    case 'r-confirmar': confirmarReserva(id); break;
    case 'borrar-reserva': S.reservas = S.reservas.filter(r => r.id !== id); guardar(); pintarPerfil(); break;
    case 'paywall': abrirPaywall(); break;
    case 'checkout': abrirCheckout('app'); break;
    case 'ck-confirmar': checkoutConfirmado(b.dataset.origen); break;
    case 'cancelar-sub': confirmar(t('pf.cancel.q'), () => { S.cancelado = true; guardar(); pintarPerfil(); toast(t('pf.cancel.done')); }); break;
    case 'reanudar': S.cancelado = false; guardar(); pintarPerfil(); break;
    /* modal */
    case 'cerrar-modal': cerrarModal(); break;
    case 'confirmar-si': { const f = confirmar._f; cerrarModal(); if (f) f(); break; }
    case 'ver-privacidad': abrirModal(`<h3>${t('privacy.title')}</h3><div class="legal">${t('privacy.body', { contact: esc(CONFIG.CONTACTO) })}</div><button class="btn grande" data-accion="cerrar-modal">${t('close')}</button>`, 'larga'); break;
    case 'ver-terminos': abrirModal(`<h3>${t('terms.title')}</h3><div class="legal">${t('terms.body', { price: precioTxt() })}</div><button class="btn grande" data-accion="cerrar-modal">${t('close')}</button>`, 'larga'); break;
    /* perfil */
    case 'idioma': S.lang = val; guardar(); setLangId(val); renderTodo(); break;
    case 'set-tema': S.ajustes.tema = val; guardar(); aplicarTema(); actualizarSelectores(); pintarPerfil(); break;
    case 'set-ciudad': cambiarCiudad(val); pintarPerfil(); break;
    case 'set-momento': S.ajustes.momento = val; guardar(); cambioMomento(); break;
    case 'editar-perfil': F = Object.assign(nuevoF(), JSON.parse(JSON.stringify(S.usuario)), { edad: String(S.usuario.edad) }); OB = { paso: 'p1', edit: true, error: '', locMsg: '' }; cerrarSheet(); $('#app').classList.add('hidden'); $('#onboarding').classList.remove('hidden'); obRender(); break;
    case 'activar-ubicacion':
      if (!S.consent) abrirModal(`<h3>${t('privacy.title')}</h3><div class="legal">${t('privacy.body', { contact: esc(CONFIG.CONTACTO) })}</div><button class="btn grande" data-accion="aceptar-ubicacion">${t('loc.enable')}</button><button class="btn sec grande" data-accion="cerrar-modal">${t('cancel')}</button>`, 'larga');
      else pedirUbicacion(r => { if (r === 'ok') { pintarYo(); centrarEnMi(); toast(t('loc.ok')); } else toast(t(r === 'unsupported' ? 'loc.unsupported' : 'loc.denied'), 3600); pintarPerfil(); });
      break;
    case 'aceptar-ubicacion': S.consent = true; guardar(); cerrarModal(); pedirUbicacion(r => { if (r === 'ok') { pintarYo(); centrarEnMi(); toast(t('loc.ok')); } else toast(t(r === 'unsupported' ? 'loc.unsupported' : 'loc.denied'), 3600); pintarPerfil(); }); break;
    case 'revocar-ubicacion': S.pos = null; S.consent = false; guardar(); pintarYo(); pintarPerfil(); toast(t('pf.loc.off')); break;
    case 'instalar': if (V_.installEvt) { V_.installEvt.prompt(); V_.installEvt = null; pintarPerfil(); } break;
    case 'exportar': {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }), url = URL.createObjectURL(blob), a2 = document.createElement('a');
      a2.href = url; a2.download = 'vibemaps-datos.json'; document.body.appendChild(a2); a2.click(); a2.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); toast(t('toast.exported')); break;
    }
    case 'borrar-todo': confirmar(t('pf.delete.q'), () => { try { localStorage.removeItem(CONFIG.STORAGE_KEY); } catch (er) { /* ignorar */ } location.reload(); }); break;
  }
});
document.addEventListener('input', e => {
  const f = e.target.dataset && e.target.dataset.f; if (f) F[f] = e.target.value;
  if (e.target.id === 'chk-consent') { S.consent = e.target.checked; guardar(); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!$('#modal').classList.contains('hidden')) cerrarModal(); else if (V_.sheet) cerrarSheet(); } if (e.key === 'Enter' && e.target.matches('#onboarding input')) { const b = $('#onboarding [data-accion="ob-sig"]'); if (b) b.click(); } });

/* =====================================================================
   12) Arranque, PWA y eventos del sistema
   ===================================================================== */
function registrarSW() {
  if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
  navigator.serviceWorker.register('sw.js').catch(() => { /* sin SW la app sigue funcionando */ });
  let recargado = false;
  const habia = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!habia || recargado) return; recargado = true; toast(t('toast.updated')); setTimeout(() => location.reload(), 900); });
}
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); V_.installEvt = e; if (V_.vista === 'profile' && !$('#app').classList.contains('hidden')) pintarPerfil(); });
window.addEventListener('offline', () => { if (!$('#app').classList.contains('hidden')) toast(t('toast.offline'), 3200); });

function boot() {
  setLangId(S.lang || detectarIdioma());
  $('#sel-ciudad').addEventListener('change', e => cambiarCiudad(e.target.value));
  $('#sel-momento').addEventListener('change', e => { S.ajustes.momento = e.target.value; guardar(); cambioMomento(); });
  $('#btn-tema').addEventListener('click', () => { S.ajustes.tema = tema() === 'dark' ? 'light' : 'dark'; guardar(); aplicarTema(); actualizarSelectores(); pintarVistaActual(); });
  $('#btn-centrar').addEventListener('click', centrarEnMi);
  $('#pista-lock').addEventListener('click', abrirPaywall);
  $('#sheet-bg').addEventListener('click', cerrarSheet);
  refrescarPlan();
  if (S.onboarded && S.usuario) entrarApp(); else mostrarOnboarding('lang');
  registrarSW();
}
boot();
