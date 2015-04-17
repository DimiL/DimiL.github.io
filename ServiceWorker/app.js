// register service worker

if ('serviceWorker' in navigator) {
  console.log("With service worker");
  navigator.serviceWorker.register('./imgs/sw.js').then(function(reg) {
    console.log('Registration succeeded. Scope is ' + reg.scope);
  });
//  navigator.serviceWorker.register('./imgs/sw2.js').then(function(reg) {
//    console.log('Registration succeeded. Scope is ' + reg.scope);
//  });
} else {
  console.log("Without service worker");
}
