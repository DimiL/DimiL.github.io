this.addEventListener('install', function(event) {
  console.log("[Dimi]install event v5");

  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/nsec/',
        '/nsec/index.html',
        '/nsec/style.css',
        '/nsec/image-list.js',
        '/nsec/star-wars-logo.jpg',
        '/nsec/gallery/',
        '/nsec/gallery/bountyHunters.jpg',
        '/nsec/gallery/myLittleVader.jpg',
        '/nsec/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('activate', function() {
  console.log('[Dimi]activate event v1');
});

this.addEventListener('fetch', function(event) {
  console.log("[Dimi]fetch event : " + event.request.url);
  console.log("[Dimi]fetch context: " + event.request.context);
  var context_new = (new Request(event.request)).context;
  console.log("[Dimi]fetch new context : " + context_new);
  var response;
  var cachedResponse = caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/nsec/gallery/myLittleVader.jpg');
  });
});
