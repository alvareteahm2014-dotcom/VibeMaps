/* VibeMaps · zonas simuladas y locales reales (OpenStreetMap) de Londres y Madrid */
'use strict';

const CONFIG = {
  PRECIO_GBP: 5,
  MONEDA: 'GBP',
  /* Cuando exista una cuenta de Stripe, pega aquí el enlace de pago (Payment Link) de la suscripción mensual. */
  STRIPE_PAYMENT_LINK: '',
  CONTACTO: 'hola@vibemaps.example',
  STORAGE_KEY: 'vibemaps.v1'
};

const OPCIONES = {
  sexo: ['mujer', 'hombre', 'otro'],
  estilos: ['arreglado', 'pijo', 'rollo', 'alternativo', 'casual', 'deportivo'],
  sectores: ['finanzas', 'consultoria', 'tecnologia', 'sanidad', 'derecho', 'educacion', 'arte', 'hosteleria', 'comercio', 'ingenieria', 'estudiante', 'otro'],
  ambientes: ['fiesta', 'copas', 'terraza', 'conciertos', 'tranquilo', 'deporte'],
  musicas: ['comercial', 'electronica', 'reggaeton', 'techno', 'indie', 'rock']
};

const PAISES = ['ES', 'GB', 'FR', 'IT', 'DE', 'PT', 'US', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'BR', 'EC', 'UY', 'BO', 'PY', 'DO', 'CU', 'CR', 'PA', 'GT', 'HN', 'SV', 'NI',
  'MA', 'DZ', 'EG', 'SN', 'NG', 'ZA', 'BD', 'IN', 'PK', 'PH', 'CN', 'JP', 'KR', 'TR', 'IL', 'LB', 'SA', 'AE', 'NL', 'BE', 'CH', 'IE', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU',
  'RO', 'BG', 'HR', 'GR', 'UA', 'RU', 'CA', 'AU', 'NZ'];

const COLOR = { alta: '#3CD46B', media: '#FFC61A', baja: '#F04A3E', gris: '#7C7C86' };
const ICONO_TIPO = { club: '🪩', cocktail: '🍸', bar: '🍻', rooftop: '🌇', sala: '🎸', terraza: '☀️', parque: '🌳' };
const GRAD = {
  club: 'linear-gradient(135deg,#7B2FF7,#F107A3)', cocktail: 'linear-gradient(135deg,#F5B700,#F04A3E)', bar: 'linear-gradient(135deg,#0F9B8E,#3CD46B)',
  rooftop: 'linear-gradient(135deg,#FF8A00,#E52E71)', sala: 'linear-gradient(135deg,#3A7BD5,#00D2FF)', terraza: 'linear-gradient(135deg,#F9D423,#FF9A44)', parque: 'linear-gradient(135deg,#56AB2F,#A8E063)'
};

function zip(keys, vals) { const o = {}; keys.forEach((k, i) => { o[k] = vals[i] || 0; }); return o; }
/* P(edad media, reparto de edades, % mujeres, estilos[6], sectores[12], % internacional, nacionalidades top, energía, ambientes[6], músicas[6], etiquetas) */
function P(edadMedia, edades, mujer, estilos, sectores, internacional, top, energia, ambientes, musicas, tags) {
  return {
    edadMedia, edades, sexo: { mujer, hombre: 100 - mujer },
    estilos: zip(OPCIONES.estilos, estilos), sectores: zip(OPCIONES.sectores, sectores),
    internacional, top, energia, ambientes: zip(OPCIONES.ambientes, ambientes), musicas: zip(OPCIONES.musicas, musicas), tags
  };
}

const ZONAS_MAD = [
  { id: 'salamanca', nombre: 'Salamanca', lat: 40.4262, lng: -3.6820, radio: 650, base: 520, actividad: { dia: .55, noche: 1 },
    perfil: P(30, { '18-24': 10, '25-35': 62, '36-45': 22, '45+': 6 }, 53, [40, 38, 4, 2, 11, 5], [30, 16, 8, 6, 14, 3, 3, 3, 8, 4, 1, 4], 24, ['IT', 'MX', 'GB'], .75, [25, 32, 28, 3, 8, 4], [40, 25, 12, 3, 12, 8], ['tag.cocktails', 'tag.dress', 'tag.exclusive']) },
  { id: 'azca', nombre: 'Azca & Castellana', lat: 40.4506, lng: -3.6935, radio: 500, base: 700, actividad: { dia: .25, noche: 1 },
    perfil: P(27, { '18-24': 22, '25-35': 60, '36-45': 15, '45+': 3 }, 50, [42, 30, 6, 3, 14, 5], [28, 22, 8, 4, 6, 2, 2, 3, 6, 12, 3, 4], 20, ['IT', 'FR', 'MX'], .95, [45, 25, 10, 5, 3, 2], [35, 25, 28, 6, 3, 3], ['tag.bigclubs', 'tag.late', 'tag.vip']) },
  { id: 'malasana', nombre: 'Malasaña', lat: 40.4265, lng: -3.7045, radio: 550, base: 640, actividad: { dia: .6, noche: .95 },
    perfil: P(26, { '18-24': 28, '25-35': 56, '36-45': 13, '45+': 3 }, 51, [8, 3, 40, 32, 14, 3], [5, 6, 14, 4, 3, 4, 18, 9, 5, 4, 20, 8], 30, ['IT', 'FR', 'AR'], .8, [35, 28, 15, 15, 5, 2], [8, 20, 5, 12, 35, 20], ['tag.character', 'tag.indie_electro', 'tag.young']) },
  { id: 'chueca', nombre: 'Chueca', lat: 40.4228, lng: -3.6975, radio: 450, base: 560, actividad: { dia: .6, noche: 1 },
    perfil: P(28, { '18-24': 14, '25-35': 60, '36-45': 21, '45+': 5 }, 50, [25, 10, 28, 12, 20, 5], [14, 12, 12, 6, 6, 4, 14, 8, 8, 4, 4, 8], 34, ['US', 'FR', 'IT'], .9, [38, 32, 18, 6, 4, 2], [30, 38, 8, 8, 10, 6], ['tag.inclusive', 'tag.terraces', 'tag.night']) },
  { id: 'lavapies', nombre: 'Lavapiés', lat: 40.4085, lng: -3.7010, radio: 500, base: 600, actividad: { dia: .7, noche: .85 },
    perfil: P(28, { '18-24': 24, '25-35': 52, '36-45': 18, '45+': 6 }, 50, [4, 1, 35, 45, 12, 3], [3, 4, 12, 3, 12, 6, 5, 15, 28, 6, 5, 1], 46, ['AR', 'IT', 'MA', 'BD'], .7, [30, 35, 15, 20, 0, 0], [5, 10, 15, 20, 30, 20], ['tag.multicultural', 'tag.live', 'tag.cheap']) },
  { id: 'moncloa', nombre: 'Moncloa & Argüelles', lat: 40.4352, lng: -3.7195, radio: 550, base: 580, actividad: { dia: .6, noche: .8 },
    perfil: P(21, { '18-24': 70, '25-35': 24, '36-45': 4, '45+': 2 }, 50, [10, 12, 15, 8, 35, 20], [3, 2, 4, 2, 3, 2, 4, 3, 3, 2, 70, 2], 18, ['IT', 'FR', 'DE'], .85, [45, 30, 10, 3, 8, 4], [45, 20, 20, 3, 6, 6], ['tag.university', 'tag.student', 'tag.early']) },
  { id: 'retiro', nombre: 'Retiro & Ibiza', lat: 40.4153, lng: -3.6840, radio: 600, base: 520, actividad: { dia: 1, noche: .3 },
    perfil: P(32, { '18-24': 10, '25-35': 48, '36-45': 30, '45+': 12 }, 53, [30, 22, 8, 3, 22, 15], [18, 15, 12, 12, 10, 12, 8, 5, 3, 2, 2, 1], 20, ['IT', 'FR', 'US'], .45, [5, 20, 38, 2, 20, 15], [20, 5, 10, 1, 35, 29], ['tag.walk', 'tag.brunch', 'tag.morning']) },
  { id: 'rio', nombre: 'Madrid Río', lat: 40.4005, lng: -3.7165, radio: 700, base: 480, actividad: { dia: 1, noche: .3 },
    perfil: P(29, { '18-24': 22, '25-35': 46, '36-45': 22, '45+': 10 }, 49, [8, 4, 22, 15, 26, 25], [6, 5, 15, 4, 10, 8, 12, 10, 10, 5, 12, 3], 20, ['IT', 'AR', 'CO'], .5, [10, 15, 30, 5, 20, 20], [15, 20, 15, 5, 30, 15], ['tag.run', 'tag.river', 'tag.relaxed']) },
  { id: 'sol', nombre: 'Sol & Huertas', lat: 40.4150, lng: -3.7000, radio: 500, base: 720, actividad: { dia: .9, noche: 1 },
    perfil: P(27, { '18-24': 25, '25-35': 50, '36-45': 20, '45+': 5 }, 50, [10, 8, 25, 22, 25, 10], [6, 6, 8, 4, 4, 4, 8, 14, 12, 4, 18, 12], 55, ['US', 'IT', 'FR'], .9, [38, 30, 15, 12, 3, 2], [30, 15, 20, 8, 15, 12], ['tag.tourist', 'tag.tapas', 'tag.late']) },
  { id: 'latina', nombre: 'La Latina', lat: 40.4108, lng: -3.7098, radio: 450, base: 540, actividad: { dia: .9, noche: .7 },
    perfil: P(31, { '18-24': 12, '25-35': 48, '36-45': 28, '45+': 12 }, 50, [18, 12, 20, 10, 30, 10], [10, 8, 10, 8, 8, 8, 10, 12, 8, 6, 6, 6], 32, ['IT', 'FR', 'DE'], .55, [10, 28, 38, 6, 14, 4], [20, 8, 6, 3, 30, 33], ['tag.tapas', 'tag.sunday', 'tag.terraces']) },
  { id: 'chamberi', nombre: 'Chamberí', lat: 40.4335, lng: -3.7035, radio: 600, base: 500, actividad: { dia: .8, noche: .7 },
    perfil: P(31, { '18-24': 12, '25-35': 50, '36-45': 28, '45+': 10 }, 52, [28, 20, 10, 6, 28, 8], [16, 12, 12, 12, 10, 8, 6, 4, 6, 8, 3, 3], 18, ['IT', 'FR', 'US'], .5, [10, 28, 30, 5, 20, 7], [22, 12, 4, 2, 32, 28], ['tag.neighbourhood', 'tag.brunch', 'tag.calmbars']) }
];

/* tipo: club | cocktail | bar | rooftop | sala | terraza | parque · franja: noche | dia | ambos · partner: paga por contacto, estadísticas y reservas */
function V(id, zona, nombre, tipo, franja, partner, precio, aforo, horario, musica, ambiente, lat, lng) {
  return { id, zona, nombre, tipo, franja, partner, precio, aforo, horario, musica, ambiente, lat, lng };
}


/* =====================================================================
   LONDRES (ciudad principal) · datos simulados; nombres de locales ficticios
   ===================================================================== */
const ZONAS_LDN = [
  { id: 'soho', nombre: 'Soho', lat: 51.5134, lng: -0.1337, radio: 450, base: 760, actividad: { dia: .8, noche: 1 },
    perfil: P(29, { '18-24': 18, '25-35': 56, '36-45': 20, '45+': 6 }, 49, [26, 12, 26, 14, 18, 4], [8, 8, 12, 4, 4, 3, 22, 14, 8, 4, 5, 8], 52, ['FR', 'IT', 'ES'], .95, [30, 38, 12, 8, 8, 4], [30, 30, 5, 12, 15, 8], ['tag.inclusive', 'tag.late', 'tag.night']) },
  { id: 'mayfair', nombre: 'Mayfair & St James’s', lat: 51.5085, lng: -0.1520, radio: 500, base: 560, actividad: { dia: .5, noche: 1 },
    perfil: P(32, { '18-24': 8, '25-35': 52, '36-45': 30, '45+': 10 }, 52, [42, 40, 3, 1, 10, 4], [32, 14, 8, 6, 12, 2, 4, 3, 10, 4, 1, 4], 46, ['US', 'AE', 'FR'], .7, [20, 36, 26, 2, 10, 6], [38, 24, 8, 4, 16, 10], ['tag.exclusive', 'tag.dress', 'tag.vip']) },
  { id: 'shoreditch', nombre: 'Shoreditch', lat: 51.5235, lng: -0.0795, radio: 600, base: 820, actividad: { dia: .65, noche: 1 },
    perfil: P(28, { '18-24': 24, '25-35': 58, '36-45': 14, '45+': 4 }, 51, [8, 4, 38, 30, 16, 4], [6, 6, 24, 3, 4, 3, 18, 8, 6, 3, 14, 5], 44, ['FR', 'IT', 'DE'], .95, [35, 36, 5, 12, 8, 4], [10, 20, 5, 30, 20, 15], ['tag.indie_electro', 'tag.young', 'tag.late']) },
  { id: 'dalston', nombre: 'Dalston & Hackney', lat: 51.5465, lng: -0.0755, radio: 650, base: 640, actividad: { dia: .6, noche: .95 },
    perfil: P(28, { '18-24': 22, '25-35': 56, '36-45': 17, '45+': 5 }, 52, [4, 1, 36, 44, 12, 3], [3, 4, 12, 3, 5, 4, 28, 12, 6, 2, 16, 5], 40, ['IT', 'ES', 'FR'], .85, [32, 38, 8, 14, 5, 3], [4, 12, 6, 26, 36, 16], ['tag.character', 'tag.live', 'tag.indie_electro']) },
  { id: 'camden', nombre: 'Camden', lat: 51.5392, lng: -0.1426, radio: 550, base: 700, actividad: { dia: .8, noche: .9 },
    perfil: P(26, { '18-24': 34, '25-35': 46, '36-45': 15, '45+': 5 }, 49, [6, 2, 30, 46, 12, 4], [3, 4, 8, 2, 3, 3, 14, 18, 14, 2, 24, 5], 48, ['ES', 'IT', 'AU'], .85, [28, 30, 12, 30, 0, 0], [6, 14, 10, 6, 26, 38], ['tag.live', 'tag.tourist', 'tag.young']) },
  { id: 'brixton', nombre: 'Brixton', lat: 51.4613, lng: -0.1156, radio: 550, base: 640, actividad: { dia: .7, noche: .95 },
    perfil: P(29, { '18-24': 20, '25-35': 54, '36-45': 20, '45+': 6 }, 51, [8, 3, 34, 28, 22, 5], [6, 6, 12, 5, 4, 5, 14, 12, 8, 4, 12, 12], 34, ['ES', 'PT', 'IT'], .9, [30, 36, 6, 18, 10, 0], [12, 20, 10, 20, 20, 18], ['tag.multicultural', 'tag.live', 'tag.night']) },
  { id: 'peckham', nombre: 'Peckham', lat: 51.4738, lng: -0.0690, radio: 600, base: 560, actividad: { dia: .7, noche: .85 },
    perfil: P(27, { '18-24': 26, '25-35': 56, '36-45': 14, '45+': 4 }, 52, [5, 2, 34, 40, 16, 3], [3, 4, 12, 3, 4, 4, 22, 12, 6, 2, 22, 6], 30, ['IT', 'ES', 'NG'], .8, [28, 34, 12, 12, 14, 0], [6, 14, 12, 18, 34, 16], ['tag.character', 'tag.terraces', 'tag.indie_electro']) },
  { id: 'nottinghill', nombre: 'Notting Hill', lat: 51.5095, lng: -0.1960, radio: 600, base: 480, actividad: { dia: .9, noche: .7 },
    perfil: P(33, { '18-24': 8, '25-35': 44, '36-45': 32, '45+': 16 }, 54, [34, 34, 8, 4, 16, 4], [14, 12, 10, 8, 10, 6, 14, 6, 10, 4, 2, 4], 40, ['US', 'FR', 'IT'], .55, [8, 30, 36, 6, 16, 4], [26, 12, 6, 2, 28, 26], ['tag.brunch', 'tag.neighbourhood', 'tag.terraces']) },
  { id: 'kingscross', nombre: 'King’s Cross', lat: 51.5330, lng: -0.1240, radio: 550, base: 580, actividad: { dia: .8, noche: .85 },
    perfil: P(30, { '18-24': 14, '25-35': 56, '36-45': 24, '45+': 6 }, 49, [14, 6, 22, 14, 38, 6], [8, 8, 30, 4, 6, 6, 8, 4, 6, 8, 8, 4], 36, ['IT', 'FR', 'ES'], .8, [18, 34, 18, 6, 14, 10], [16, 24, 8, 16, 24, 12], ['tag.relaxed', 'tag.terraces', 'tag.indie_electro']) },
  { id: 'clapham', nombre: 'Clapham', lat: 51.4620, lng: -0.1380, radio: 650, base: 600, actividad: { dia: .8, noche: .85 },
    perfil: P(29, { '18-24': 16, '25-35': 62, '36-45': 18, '45+': 4 }, 51, [24, 22, 6, 2, 30, 16], [20, 14, 10, 8, 12, 8, 4, 4, 8, 6, 2, 4], 26, ['AU', 'ZA', 'FR'], .8, [24, 36, 18, 2, 10, 10], [40, 14, 4, 4, 18, 20], ['tag.young', 'tag.terraces', 'tag.sunday']) },
  { id: 'southbank', nombre: 'South Bank & Borough', lat: 51.5040, lng: -0.0930, radio: 700, base: 620, actividad: { dia: 1, noche: .7 },
    perfil: P(31, { '18-24': 14, '25-35': 48, '36-45': 26, '45+': 12 }, 51, [20, 12, 14, 10, 34, 10], [14, 12, 12, 6, 8, 8, 10, 8, 6, 6, 6, 4], 50, ['FR', 'US', 'ES'], .75, [12, 28, 34, 10, 14, 2], [22, 18, 8, 6, 26, 20], ['tag.river', 'tag.tourist', 'tag.walk']) }
];



/* Locales reales (real.js, de OpenStreetMap). Lo que OSM no trae (aforo, música, precio) NO se inventa: el aforo es una estimación por tipo solo para simular la afluencia. */
const TIPO_OSM = { nightclub: 'club', music_venue: 'sala', bar: 'bar', pub: 'bar' };
const AFORO_EST = { club: 450, sala: 300, bar: 110 };
function desdeOSM(o) {
  const tipo = TIPO_OSM[o.t] || 'bar';
  return { id: o.id, zona: o.z, nombre: o.n, tipo, franja: tipo === 'bar' ? 'ambos' : 'noche', partner: false, precio: '', aforo: AFORO_EST[tipo], horario: '', oh: o.h || null,
    musica: [], ambiente: tipo === 'club' ? 'fiesta' : tipo === 'sala' ? 'conciertos' : 'copas', lat: o.la, lng: o.ln, dir: o.a || '', web: o.w || '', tel: o.p || '', ig: o.i || '', real: true };
}
const LOCALES_LDN = REALES.london.map(desdeOSM);
const LOCALES_MAD = REALES.madrid.map(desdeOSM);
const PROMOTORES_LDN = {}, PROMOTORES_MAD = {};

/* Ciudades. Londres es la principal (hub). */
const CIUDADES = {
  london: { id: 'london', tz: 'Europe/London', centro: [51.5050, -0.1300], zoom: 12, zonas: ZONAS_LDN, locales: LOCALES_LDN, promotores: PROMOTORES_LDN },
  madrid: { id: 'madrid', tz: 'Europe/Madrid', centro: [40.4215, -3.7015], zoom: 13, zonas: ZONAS_MAD, locales: LOCALES_MAD, promotores: PROMOTORES_MAD }
};
const CIUDAD_DEF = 'london';
let CIUDAD = CIUDADES[CIUDAD_DEF], ZONAS = CIUDAD.zonas, LOCALES = CIUDAD.locales, PROMOTORES = CIUDAD.promotores;
function usarCiudad(id) { CIUDAD = CIUDADES[id] || CIUDADES[CIUDAD_DEF]; ZONAS = CIUDAD.zonas; LOCALES = CIUDAD.locales; PROMOTORES = CIUDAD.promotores; return CIUDAD; }
function ciudadMasCercana(pos) {
  let mejor = null, dmin = 1e9;
  Object.values(CIUDADES).forEach(c => { const dLat = (c.centro[0] - pos.lat) * 111, dLng = (c.centro[1] - pos.lng) * 111 * Math.cos(pos.lat * Math.PI / 180), dist = Math.hypot(dLat, dLng); if (dist < dmin) { dmin = dist; mejor = c.id; } });
  return { id: mejor, km: dmin };
}

const RESERVA_TIPOS = { club: ['lista', 'entrada', 'reservado'], cocktail: ['mesa'], bar: ['mesa'], rooftop: ['mesa'], sala: ['entrada', 'mesa'], terraza: ['mesa'], parque: [] };
