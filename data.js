/* VibeMaps · datos simulados de Madrid (zonas, locales, promotores) */
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

const ZONAS = [
  { id: 'salamanca', nombre: 'Salamanca', lat: 40.4262, lng: -3.6820, radio: 650, base: 520, actividad: { dia: .55, noche: 1 },
    perfil: P(30, { '18-24': 10, '25-35': 62, '36-45': 22, '45+': 6 }, 53, [40, 38, 4, 2, 11, 5], [30, 16, 8, 6, 14, 3, 3, 3, 8, 4, 1, 4], 24, ['IT', 'MX', 'GB'], .75, [25, 32, 28, 3, 8, 4], [40, 25, 12, 3, 12, 8], ['tag.cocktails', 'tag.dress', 'tag.exclusive']) },
  { id: 'azca', nombre: 'Azca y Castellana', lat: 40.4506, lng: -3.6935, radio: 500, base: 700, actividad: { dia: .25, noche: 1 },
    perfil: P(27, { '18-24': 22, '25-35': 60, '36-45': 15, '45+': 3 }, 50, [42, 30, 6, 3, 14, 5], [28, 22, 8, 4, 6, 2, 2, 3, 6, 12, 3, 4], 20, ['IT', 'FR', 'MX'], .95, [45, 25, 10, 5, 3, 2], [35, 25, 28, 6, 3, 3], ['tag.bigclubs', 'tag.late', 'tag.vip']) },
  { id: 'malasana', nombre: 'Malasaña', lat: 40.4265, lng: -3.7045, radio: 550, base: 640, actividad: { dia: .6, noche: .95 },
    perfil: P(26, { '18-24': 28, '25-35': 56, '36-45': 13, '45+': 3 }, 51, [8, 3, 40, 32, 14, 3], [5, 6, 14, 4, 3, 4, 18, 9, 5, 4, 20, 8], 30, ['IT', 'FR', 'AR'], .8, [35, 28, 15, 15, 5, 2], [8, 20, 5, 12, 35, 20], ['tag.character', 'tag.indie_electro', 'tag.young']) },
  { id: 'chueca', nombre: 'Chueca', lat: 40.4228, lng: -3.6975, radio: 450, base: 560, actividad: { dia: .6, noche: 1 },
    perfil: P(28, { '18-24': 14, '25-35': 60, '36-45': 21, '45+': 5 }, 50, [25, 10, 28, 12, 20, 5], [14, 12, 12, 6, 6, 4, 14, 8, 8, 4, 4, 8], 34, ['US', 'FR', 'IT'], .9, [38, 32, 18, 6, 4, 2], [30, 38, 8, 8, 10, 6], ['tag.inclusive', 'tag.terraces', 'tag.night']) },
  { id: 'lavapies', nombre: 'Lavapiés', lat: 40.4085, lng: -3.7010, radio: 500, base: 600, actividad: { dia: .7, noche: .85 },
    perfil: P(28, { '18-24': 24, '25-35': 52, '36-45': 18, '45+': 6 }, 50, [4, 1, 35, 45, 12, 3], [3, 4, 12, 3, 12, 6, 5, 15, 28, 6, 5, 1], 46, ['AR', 'IT', 'MA', 'BD'], .7, [30, 35, 15, 20, 0, 0], [5, 10, 15, 20, 30, 20], ['tag.multicultural', 'tag.live', 'tag.cheap']) },
  { id: 'moncloa', nombre: 'Moncloa y Argüelles', lat: 40.4352, lng: -3.7195, radio: 550, base: 580, actividad: { dia: .6, noche: .8 },
    perfil: P(21, { '18-24': 70, '25-35': 24, '36-45': 4, '45+': 2 }, 50, [10, 12, 15, 8, 35, 20], [3, 2, 4, 2, 3, 2, 4, 3, 3, 2, 70, 2], 18, ['IT', 'FR', 'DE'], .85, [45, 30, 10, 3, 8, 4], [45, 20, 20, 3, 6, 6], ['tag.university', 'tag.student', 'tag.early']) },
  { id: 'retiro', nombre: 'Retiro e Ibiza', lat: 40.4153, lng: -3.6840, radio: 600, base: 520, actividad: { dia: 1, noche: .3 },
    perfil: P(32, { '18-24': 10, '25-35': 48, '36-45': 30, '45+': 12 }, 53, [30, 22, 8, 3, 22, 15], [18, 15, 12, 12, 10, 12, 8, 5, 3, 2, 2, 1], 20, ['IT', 'FR', 'US'], .45, [5, 20, 38, 2, 20, 15], [20, 5, 10, 1, 35, 29], ['tag.walk', 'tag.brunch', 'tag.morning']) },
  { id: 'rio', nombre: 'Madrid Río', lat: 40.4005, lng: -3.7165, radio: 700, base: 480, actividad: { dia: 1, noche: .3 },
    perfil: P(29, { '18-24': 22, '25-35': 46, '36-45': 22, '45+': 10 }, 49, [8, 4, 22, 15, 26, 25], [6, 5, 15, 4, 10, 8, 12, 10, 10, 5, 12, 3], 20, ['IT', 'AR', 'CO'], .5, [10, 15, 30, 5, 20, 20], [15, 20, 15, 5, 30, 15], ['tag.run', 'tag.river', 'tag.relaxed']) },
  { id: 'sol', nombre: 'Sol y Huertas', lat: 40.4150, lng: -3.7000, radio: 500, base: 720, actividad: { dia: .9, noche: 1 },
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
const LOCALES = [
  V('ambar', 'salamanca', 'Ámbar', 'club', 'noche', true, '€€€', 550, '23:30 – 06:00', ['comercial', 'electronica'], 'fiesta', 40.4280, -3.6795),
  V('velvet', 'salamanca', 'Velvet Lounge', 'cocktail', 'noche', false, '€€€', 180, '19:00 – 03:00', ['electronica', 'comercial'], 'copas', 40.4249, -3.6840),
  V('serrano22', 'salamanca', 'Terraza Serrano 22', 'terraza', 'ambos', true, '€€', 140, '12:00 – 01:30', ['indie', 'comercial'], 'terraza', 40.4270, -3.6870),
  V('nebula', 'azca', 'Nébula', 'club', 'noche', true, '€€€', 900, '00:00 – 06:30', ['reggaeton', 'comercial'], 'fiesta', 40.4512, -3.6928),
  V('norte', 'azca', 'Sala Norte', 'club', 'noche', false, '€€', 700, '23:30 – 06:00', ['techno', 'electronica'], 'fiesta', 40.4495, -3.6950),
  V('oficina', 'azca', 'La Oficina', 'bar', 'noche', false, '€€', 160, '18:00 – 03:00', ['comercial', 'rock'], 'copas', 40.4520, -3.6905),
  V('almendro', 'malasana', 'Bar Almendro', 'bar', 'noche', false, '€', 110, '19:00 – 03:00', ['indie', 'rock'], 'copas', 40.4272, -3.7062),
  V('cabina', 'malasana', 'La Cabina', 'sala', 'noche', false, '€€', 250, '20:30 – 04:00', ['indie', 'rock'], 'conciertos', 40.4258, -3.7030),
  V('taller29', 'malasana', 'Taller 29', 'bar', 'noche', true, '€€', 200, '22:00 – 05:00', ['electronica', 'techno'], 'fiesta', 40.4280, -3.7040),
  V('pluma', 'chueca', 'Pluma', 'cocktail', 'noche', true, '€€', 150, '20:00 – 03:30', ['electronica', 'comercial'], 'copas', 40.4235, -3.6985),
  V('arlequin', 'chueca', 'Club Arlequín', 'club', 'noche', false, '€€', 480, '00:00 – 06:00', ['comercial', 'electronica'], 'fiesta', 40.4222, -3.6962),
  V('hortaleza', 'chueca', 'Terraza Hortaleza', 'terraza', 'ambos', false, '€€', 120, '12:00 – 01:00', ['comercial', 'indie'], 'terraza', 40.4240, -3.6970),
  V('tamarindo', 'lavapies', 'Casa Tamarindo', 'bar', 'noche', false, '€', 130, '19:00 – 03:00', ['reggaeton', 'indie'], 'copas', 40.4092, -3.7022),
  V('acequia', 'lavapies', 'Sala Acequia', 'sala', 'noche', true, '€€', 320, '21:00 – 04:00', ['indie', 'rock'], 'conciertos', 40.4078, -3.6995),
  V('campus', 'moncloa', 'Campus Club', 'club', 'noche', true, '€', 600, '23:00 – 05:30', ['reggaeton', 'comercial'], 'fiesta', 40.4358, -3.7210),
  V('cantina', 'moncloa', 'La Cantina del Arco', 'bar', 'noche', false, '€', 140, '18:00 – 02:30', ['comercial', 'rock'], 'copas', 40.4345, -3.7180),
  V('estanque', 'retiro', 'Terraza Estanque', 'terraza', 'ambos', true, '€€', 170, '10:00 – 01:00', ['indie', 'comercial'], 'terraza', 40.4160, -3.6835),
  V('brunch', 'retiro', 'Brunch & Co', 'terraza', 'dia', false, '€€', 90, '09:00 – 18:00', ['indie'], 'tranquilo', 40.4145, -3.6852),
  V('manzanares', 'rio', 'Chiringuito Manzanares', 'terraza', 'ambos', false, '€€', 200, '11:00 – 01:00', ['comercial', 'indie'], 'terraza', 40.4010, -3.7150),
  V('campa', 'rio', 'Campa del Río', 'parque', 'dia', false, '', 800, '08:00 – 22:00', ['indie'], 'tranquilo', 40.3995, -3.7185),
  V('azotea', 'sol', 'Azotea Sol 7', 'rooftop', 'ambos', true, '€€€', 220, '13:00 – 02:00', ['electronica', 'comercial'], 'copas', 40.4162, -3.7025),
  V('meridiano', 'sol', 'Club Meridiano', 'club', 'noche', false, '€€', 750, '23:30 – 06:00', ['comercial', 'reggaeton'], 'fiesta', 40.4143, -3.6988),
  V('bodega', 'sol', 'Bodega Huertas', 'bar', 'ambos', false, '€', 100, '12:00 – 02:00', ['rock', 'indie'], 'copas', 40.4138, -3.6975),
  V('cava', 'latina', 'Terraza Cava Baja', 'terraza', 'ambos', false, '€€', 160, '12:00 – 01:30', ['comercial', 'indie'], 'terraza', 40.4113, -3.7085),
  V('vermut45', 'latina', 'Bar Vermut 45', 'bar', 'ambos', false, '€', 90, '11:00 – 00:30', ['rock', 'indie'], 'tranquilo', 40.4102, -3.7110),
  V('olavide', 'chamberi', 'Rooftop Olavide', 'rooftop', 'ambos', true, '€€€', 180, '13:00 – 01:30', ['electronica', 'indie'], 'copas', 40.4340, -3.7020),
  V('breton', 'chamberi', 'Café Bretón', 'bar', 'ambos', false, '€€', 100, '10:00 – 01:00', ['indie', 'rock'], 'tranquilo', 40.4325, -3.7050)
];

/* Contactos ficticios de los locales con reserva directa */
const PROMOTORES = {
  ambar: { nombre: 'Lucía Ferrer', tel: '+34 600 000 001', ig: 'ambar.demo' },
  serrano22: { nombre: 'Carlos Rey', tel: '+34 600 000 002', ig: 'serrano22.demo' },
  nebula: { nombre: 'Marta Sanz', tel: '+34 600 000 003', ig: 'nebula.demo' },
  taller29: { nombre: 'Íñigo Lara', tel: '+34 600 000 004', ig: 'taller29.demo' },
  pluma: { nombre: 'Dani Cruz', tel: '+34 600 000 005', ig: 'pluma.demo' },
  acequia: { nombre: 'Noor Haddad', tel: '+34 600 000 006', ig: 'acequia.demo' },
  campus: { nombre: 'Sergio Peña', tel: '+34 600 000 007', ig: 'campus.demo' },
  estanque: { nombre: 'Elena Gil', tel: '+34 600 000 008', ig: 'estanque.demo' },
  azotea: { nombre: 'Pablo Mora', tel: '+34 600 000 009', ig: 'azotea.demo' },
  olavide: { nombre: 'Irene Vidal', tel: '+34 600 000 010', ig: 'olavide.demo' }
};

const RESERVA_TIPOS = { club: ['lista', 'entrada', 'reservado'], cocktail: ['mesa'], bar: ['mesa'], rooftop: ['mesa'], sala: ['entrada', 'mesa'], terraza: ['mesa'], parque: [] };
