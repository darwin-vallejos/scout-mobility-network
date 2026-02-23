const CACHE_NAME = 'scout-v1';
const ASSETS = ['/', '/index.html', '/scout_rider.html', '/scout_host.html', '/flow_la_v3.html', '/manifest.json'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); });
self.addEventListener('fetch', (e) => { e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))); });
