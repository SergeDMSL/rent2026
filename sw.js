// Keeps the booth tool working when the hall Wi-Fi drops.
// Pages: network first, cache as fallback. Fonts, images, scripts: cache first.
// Bump VERSION after each change so iPads drop the old cache.
const VERSION = 'rent-2026-v3';
const FILES = ['/', '/index.html', '/qrcode.min.js', '/manifest.webmanifest',
  '/assets/lockup_primary.png', '/assets/icon-180.png', '/assets/icon-192.png', '/assets/icon-512.png',
  '/fonts/Montserrat-Light.ttf', '/fonts/Montserrat-Medium.ttf', '/fonts/Montserrat-Bold.ttf', '/fonts/Montserrat-ExtraBold.ttf'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('/', copy)); return r; })
      .catch(() => caches.match('/')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
