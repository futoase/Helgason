var socketIoJs = {
  addPort : (frontEnvironment.origin() + '/socket.io/socket.io.js'),
  noPort: (frontEnvironment.origin() + '/socket.io.socket.io.js')
};

// Loaded socket.io.js
$.get(socketIoJs.addPort).done(function () {
  $.getScript(socketIoJs.addPort).done(function () {
    postMessage({ usePort: true });
  });
}).fail(function() {
  $.get(socketIoJs.noPort).done(function() {
    $.getScript(socketIoJs.noPort).done(function () {
      postMessage({ usePort: false });
    });
  }).fail(function () {
    alert("socket.io loaded error...");
  });
});

