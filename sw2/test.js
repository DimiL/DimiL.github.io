console.log('Registering service worker');

navigator.serviceWorker.register('sw.js', {
  scope: './'
}).then(function(worker) {
  console.log('Registered');
}, function(e) {
  console.error('Not registered:' + e);
});

navigator.serviceWorker.ready.then(function(sw) {
  console.log(window.performance.now() + ' READY');
  sw.active.postMessage('ready');
});

navigator.serviceWorker.onmessage = function(msg) {
  console.log('MESSAGE RECEIVED', msg.data);
};

window.onmessage = function(msg) {
  console.log('MESSAGE RECEIVED', msg.data);
};

