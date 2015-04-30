// register service worker
console.log("Dimi...run app.js");

if ('serviceWorker' in navigator) {
  console.log("With service worker");
//  navigator.serviceWorker.register('https://dimil.github.io/sw/monitor/sw.js').then(function(reg) {
    navigator.serviceWorker.register('./monitor/sw.js').then(function(reg) {
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch((err) => {
    console.log('Registration fail : ' + JSON.stringify(err));
  });
} else {
  console.log("Without service worker");
}
