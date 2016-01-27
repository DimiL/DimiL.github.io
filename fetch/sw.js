this.addEventListener('install', function(event) {
  console.log("[Dimi][App]Install 1>>");
});

this.addEventListener('fetch', function(event) {
  console.log("[Dimi][App]Fetch 1>>");

//  url = "https://dimil.github.io/sw-test/gallery/myLittleVader.jpg";
  url = "https://c2.staticflickr.com/6/5809/23045784234_4bb7f9d076_k.jpg";
  var req = new Request(url, { mode : 'no-cors',
                               method : 'GET' });

  fetch(req).then(function(res) {
    console.log("[Dimi]fetch return ok(" + res.ok + "), type(" + res.type + ")\n");
  }, function(e) {
    console.log("[Dimi]fetch return fail\n");
  });

  console.log("[Dimi][App]Fetch <<");
});
