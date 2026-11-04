/* VibeMaps · service worker. Sube VERSION en cada publicación para que los móviles se actualicen solos. */
const VERSION = 'vibemaps-v1.1.0';
const SHELL = VERSION + '-shell';
const TILES = 'vibemaps-tiles-v1';
const MAX_TILES = 500;
const ARCHIVOS = [
  './', 'index.html', 'style.css', 'app.js', 'data.js', 'i18n.js', 'manifest.webmanifest',
  'vendor/leaflet.js', 'vendor/leaflet.css',
  'fonts/sora-latin-400-normal.woff2', 'fonts/sora-latin-600-normal.woff2', 'fonts/sora-latin-700-normal.woff2', 'fonts/sora-latin-800-normal.woff2',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => Promise.all(ARCHIVOS.map(a => fetch(a, { cache: 'reload' }).then(r => { if (!r.ok) throw new Error(a); return c.put(a, r); })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

async function recortar(cache) {
  const ks = await cache.keys();
  if (ks.length > MAX_TILES) await Promise.all(ks.slice(0, ks.length - MAX_TILES).map(k => cache.delete(k)));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Mapa base: red primero, caché si no hay conexión */
  if (/(^|\.)arcgisonline\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(TILES).then(async c => {
      try {
        const r = await fetch(req);
        if (r && (r.ok || r.type === 'opaque')) { c.put(req, r.clone()); recortar(c); }
        return r;
      } catch (err) {
        const hit = await c.match(req);
        return hit || Response.error();
      }
    }));
    return;
  }

  if (url.origin !== location.origin) return;

  /* Páginas: red primero (para recibir actualizaciones), caché de reserva */
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copia = r.clone(); caches.open(SHELL).then(c => c.put('index.html', copia)); return r; }).catch(() => caches.match('index.html')));
    return;
  }

  /* Archivos de la app: caché primero y se refresca en segundo plano */
  e.respondWith(caches.match(req).then(hit => {
    const red = fetch(req, { cache: 'no-cache' }).then(r => { if (r && r.ok) { const copia = r.clone(); caches.open(SHELL).then(c => c.put(req, copia)); } return r; }).catch(() => hit);
    return hit || red;
  }));
});
