
console.log("[Dimi]SW runnning " + this + " " + JSON.stringify(this));

function debug(msg) {
  console.log("[Dimiv2]" + ' Service Worker ' + msg);
}

var _client;

function client() {
/*
  if (_client) {
    debug('have _client: ' + _client.id);
    return Promise.resolve(_client);
  }
  return self.clients.matchAll().then(function(clients) {
    debug("LENGTH:" +clients.length);
    if (!clients.length) {
      return Promise.reject();
    }
    _client = clients[0];
    return _client;
  });
*/
}

this.addEventListener('install', function(e) {
  debug('oninstall ' + e + '>>' + JSON.stringify(e));
});

this.addEventListener('activate', function() {
  debug('onactivate');
});

this.addEventListener('fetch', function(e) {
  debug('onfetch123');
/*
  debug("client: " + e.client);
  debug('onfetch ' + e.request.url);
  client().then(function(c) {
    debug('CLIENT ' + c);
    c.postMessage('using client before receiving message');
  });
*/
});

this.addEventListener('message', function(msg) {
  debug('onmessage');
/*
  debug('GOT MESSAGE ' + msg.data + ", from=" + msg.source.id);

  client().then(function(c) {
    debug('CLIENT WITHIN MESSAGE HANDLER ' + c);
    //c.postMessage('using client after receiving message');
  });
  if (msg.source) {
    //msg.source.postMessage('using msg.source');
  } else {
    debug("msg.source is null");
  }
*/
});
