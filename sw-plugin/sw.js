this.addEventListener('install', function(event) {
  console.log("[Dimi]install event v6");
});

this.addEventListener('activate', function() {
  console.log('[Dimi]activate event v1');
});

this.addEventListener('fetch', function(event) {
  console.log("[Dimi]fetch event request: " + JSON.stringify(event));
  console.log("[Dimi]fetch event request: " + event.request.url);
});
