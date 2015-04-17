// register service worker

var logger = document.getElementById("log");
if ('serviceWorker' in navigator) {
  logger.innerHTML = "with service worker";
} else {
  logger.innerHTML = "without service worker";
}
};
