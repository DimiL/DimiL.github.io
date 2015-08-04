this.addEventListener('install', function(event) {
  console.log("[Dimi]install event");
});

this.addEventListener('activate', function() {
  console.log('[Dimi]activate event v1');
});

this.addEventListener('fetch', function(event) {
  console.log("[Dimi]fetch event : " + event.request.url + "\n");
  console.log("[Dimi]fetch context: " + event.request.context + "\n");
  console.log("[Dimi]fetch crenditials: " + event.request.credentials + "\n");
//  var context_new = (new Request(event.request)).context;
//  console.log("[Dimi]fetch new context : " + context_new + "\n");
});
