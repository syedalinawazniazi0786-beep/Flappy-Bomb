const CACHE_NAME = 'flappy-bomb-v5';
const urlsToCache = [
  '/Flappy-Bomb/',
  '/Flappy-Bomb/index.html',
  '/Flappy-Bomb/manifest.json',
  '/Flappy-Bomb/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(e=>{console.log('cache fail',e); return cache.add('/Flappy-Bomb/index.html');});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME) return caches.delete(k);}))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).catch(()=>caches.match('/Flappy-Bomb/index.html'));
    })
  );
});
