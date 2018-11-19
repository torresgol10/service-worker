importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js');
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst({
    cacheName: 'cache-js',
    plugins: [
      new workbox.expiration.Plugin({
        // Keep at most 50 entries.
        maxEntries: 50,
        // Don't keep any entries for more than 30 days.
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true,
      }),
    ],
  })
  
);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
   workbox.strategies.networkFirst({
    cacheName: 'cache-css',
    plugins: [
      new workbox.expiration.Plugin({
        // Keep at most 50 entries.
        maxEntries: 50,
        // Don't keep any entries for more than 30 days.
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true,
      }),
    ],
  })
);

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('offline').then(function(cache) {
     return cache.addAll([
       '/',
     ]);
   })
 );
});



self.addEventListener('fetch', function(event) {

  console.log(event.request.url);

  event.respondWith(

    caches.match(event.request).then(function(response) {

      return response || fetch(event.request);

  })

  );

});
