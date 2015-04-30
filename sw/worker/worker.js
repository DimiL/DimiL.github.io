var tmp = 0;

console.log("shared worker is running... " + tmp);

onconnect = function(e) {
  console.log("shared worker on connect...");
  var port = e.ports[0];
  port.onmessage = function(e) {
    console.log("shared worker before calculate " + tmp);
    tmp = e.data[0] * e.data[1];
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log("shared worker calculate " + workerResult);
    port.postMessage(workerResult);
  }
  port.start();
}
