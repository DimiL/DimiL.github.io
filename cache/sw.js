this.addEventListener('install', function(event) {
  console.log("[Dimi][Cache]install\n");

  caches.delete("dimiv2");
  console.log("[Dimi][Cache]deleted2...\n");
});
