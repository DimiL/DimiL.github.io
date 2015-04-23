console.log("[SW]running");

this.addEventListener('install', function(event) {
  console.log("[SW]install");
  var urlsToCache = [
    '/',
    '/ServiceWorker/',
    '/ServiceWorker/imgs',
    '/ServiceWorker/imgs/cache.png'
  ];

  event.waitUntil(
    caches.open('v1'));
/*
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log("cache add");
      return cache.addAll(urlsToCache);
    })
  );
*/
});

this.addEventListener('fetch', function(event) {
  console.log("[SW]fetch : " + JSON.stringify(event.request));

  var cachedResponse = caches.match(event.request).then(function(r) {
    console.log("[SW]fetch ok, response = " + JSON.stringify(r));
  }).catch(function() {
    console.log("[SW]fetch not ok");
  });
/*
  var response;
  var cachedResponse = caches.match(event.request).catch(function() {
    console.log("[SW]fetch response fail");
//    return fetch(event.request);
  }).then(function(r) {
    console.log("[SW]fetch response ok?");
//    console.log("[SW]fetch response : " + JSON.stringify(r));
//    response = r;
//    caches.open('v1').then(function(cache) {
//      cache.put(event.request, response);
//    });
//    return response.clone();
  }).catch(function() {
//    return caches.match('/sw-test/gallery/myLittleVader.jpg');
  });
*/
});
