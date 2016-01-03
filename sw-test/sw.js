this.addEventListener('install', function(event) {
/*
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
*/
});

this.addEventListener('fetch', function(event) {
  console.log("[Dimi][App]Fetch 1>>");
  var response;

  cache.addAll([
        '/sw-test/index.html'
      ]);

  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }));
  console.log("[Dimi][App]Fetch <<");
});
