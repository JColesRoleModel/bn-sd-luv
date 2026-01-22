const CACHE_NAME = 'quest-log-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/icon-180.png'
];

// Install Event: Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve from Cache, fall back to Network
self.addEventListener('fetch', (event) => {
  // We ignore Firestore requests (they start with firestore.googleapis.com)
  // so we don't accidentally cache old database data.
  if (event.request.url.includes('firestore')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});