// register service worker
console.log("Dimi...run app.js");
var url = "/div/div.jpg";
var type = "backgroundImage";
var div = document.createElement('div');
document.body.appendChild(div);
div.style[type] = 'url(' + url + ')';
