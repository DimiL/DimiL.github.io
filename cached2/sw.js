this.addEventListener('install', function(event) {
  console.log("[Dimi][Cache]install\n");

  event.waitUntil(
    caches.open('dimiv2').then(function(cache) {
      return cache.addAll([
        '/cached2/',
        '/cached2/index.html',
        '/cached2/style.css',
        '/cached2/gallery/bountyHunters.jpg',
        '/cached2/gallery/myLittleVader.jpg',
        '/cached2/gallery/snowTroopers.jpg'
      ]);
    })
  );
});
