this.addEventListener('install', function(event) {
  console.log("[Dimi][Cache]install\n");

  event.waitUntil(
    caches.open('dimiv1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html'
      ]);
    })
  );
});
