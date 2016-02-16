var onetime = true;

this.addEventListener('install', function(event) {
  console.log("[Dimi]install event");
});

this.addEventListener('fetch', function(event) {
  if (!onetime) {
    return;
  }
  onetime = false;
  console.log("[Dimi]fetch event v3");

//  var url = 'http://www.nba.com/';
//  var url = 'http://www.google.com';
  var url = 'http://mdn.github.io/sw-test/star-wars-logo.jpg';
  var fetchRequest = new Request(url, { method: 'GET', mode: 'cors'});
  event.respondWith(fetch(fetchRequest).then((fetchResponse) => {
    console.log("[Dimi]fetch NBA.com : " + fetchResponse.redirected + "\n");
    return fetchResponse;
  }));
});
