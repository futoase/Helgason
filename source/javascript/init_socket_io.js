var socketIoResource = frontEnvironment.origin() + '/socket.io/socket.io.js';

// Loaded socket.io.js
$.get(socketIoResource).done(function () {
  $.getScript(socketIoResource).done(function () {
    initSocketIoConnection();
  });
}).fail(function() {
  alert("socket.io loaded error...");
});
