// register service worker

var element = document.getElementById("log");

if ('serviceWorker' in navigator) {
  element.innerHTML = "with service worker";
} else {
  element.innerHTML = "without service worker";
}
