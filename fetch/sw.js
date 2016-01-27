this.addEventListener('install', function(event) {
  console.log("[Dimi][App]Install 1>>");
});

this.addEventListener('fetch', function(event) {
  console.log("[Dimi][App]Fetch 1>>");

  url = "http://dimil.github.io/sw-test/gallery/myLittleVader.jpg";
  var req = new Request(url, { mode : 'no-cors',
                               method : 'GET' });

  fetch(req).then(function(res) {
    console.log("[Dimi]fetch return ok(" + res.ok + ")\n");
  }, function(e) {
    console.log("[Dimi]fetch return fail\n");
  });

  console.log("[Dimi][App]Fetch <<");
});
