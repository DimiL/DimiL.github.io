// register service worker

if ('serviceWorker' in navigator) {
  console.log("With service worker");
//  navigator.serviceWorker.register('https://dimil.github.io/sw/sw.js').then(function(reg) {
  navigator.serviceWorker.register('./sw.js').then(function(reg) {
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch((err) => {
    console.log('Registration fail : ' + JSON.stringify(err));
  });
} else {
  console.log("Without service worker");
}
