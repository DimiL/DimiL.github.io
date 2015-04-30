// register service worker
console.log("Dimi...run app.js");

/*
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
*/

if (!!window.SharedWorker) {
  console.log("With shared workers >>");
  var myWorker = new SharedWorker("/sw/worker/worker.js");
  myWorker.port.start();
  myWorker.port.postMessage([9,8]);
  console.log('Message posted to worker');
  console.log("With shared workers <<");

  myWorker.port.onmessage = function(e) {
    console.log('Message received from worker = ' + e.data);
  }
} else {
  console.log("Without shared workers...");
}
