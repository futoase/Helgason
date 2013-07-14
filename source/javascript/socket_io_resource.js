var socketIoResource = hostInfo.origin() + '/socket.io/socket.io.js';

// Loaded socket.io.js
$.get(socketIoResource).done(function () {
  $.getScript(socketIoResource).done(function () {
    initSocketIoConnection();
  });
}).fail(function() {
  console.error("socket.io loaded error...");
});
