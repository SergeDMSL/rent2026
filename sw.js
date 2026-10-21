// Keeps the booth tool working when the hall Wi-Fi drops.
// Pages: network first, cache as fallback. Fonts, images, scripts: cache first.
// Bump VERSION after each change so iPads drop the old cache.
const VERSION = 'rent-2026-v16';
const FILES = ['/', '/index.html', '/config.js', '/qrcode.min.js', '/manifest.webmanifest',
  '/assets/lockup_primary.png', '/assets/icon-180.png', '/assets/icon-192.png', '/assets/icon-512.png',
  '/assets/demo/today.jpg', '/assets/demo/contacts.jpg', '/assets/demo/opportunities.jpg', '/assets/demo/tasks.jpg', '/assets/demo/campaigns.jpg', '/assets/demo/estates.jpg', '/assets/demo/tx-board.jpg', '/assets/demo/txdash.jpg', '/assets/demo/ask.jpg', '/assets/demo/whiz-home.jpg', '/assets/demo/whiz-slots.jpg',
  '/fonts/Montserrat-Light.ttf', '/fonts/Montserrat-Medium.ttf', '/fonts/Montserrat-Bold.ttf', '/fonts/Montserrat-ExtraBold.ttf'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return; // Firestore and Firebase go straight to the network
  if (url.pathname === '/export.html') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('/', copy)); return r; })
      .catch(() => caches.match('/')));
    return;
  }
  if (url.pathname === '/config.js') {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('/config.js', copy)); return r; })
      .catch(() => caches.match('/config.js')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
