console.log("shared worker is running...");

onconnect = function(e) {
  console.log("shared worker on connect...");
  var port = e.ports[0];
  port.onmessage = function(e) {
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log("shared worker calculate " + workerResult);
    port.postMessage(workerResult);
  }
  port.start();
}
