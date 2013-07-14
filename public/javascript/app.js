var frontEnvironment = {
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      port: window.location.port,
      origin: function () {
        var url =  (
          frontEnvironment.protocol + '//' + 
          frontEnvironment.hostname
        );
        if (frontEnvironment.port !== "") {
          url += ':' + frontEnvironment.port;
        }
        return url;
      }
    };

var socketIoResource = frontEnvironment.origin() + '/socket.io/socket.io.js';

// Loaded socket.io.js
$.get(socketIoResource).done(function () {
  $.getScript(socketIoResource).done(function () {
    initSocketIoConnection();
  });
}).fail(function() {
  alert("socket.io loaded error...");
});

/**
 * Initial socket.io connection.
 * 
 * @return void
 */
function initSocketIoConnection() {
  // Set client by use of socket.io.
  bindEvent(socketConnection());
}

/**
 * Socket connection.
 *
 * @return socket.io object.
 */
function socketConnection() {
  return io.connect(frontEnvironment.origin());
}

/**
 * Bind Event to socket.
 *
 * @params socket Socket.io object.
 * @return void
 */
function bindEvent(socket) {
  socket.on("send-message", function (data) {
    $("#message").append(
      (data.status.basic === true ? "is basic auth" : "no basic auth") +
      " " +
      data.status.method + 
      " " + 
      JSON.stringify(data.message)
    );
    $("#message").append($("<br/>"));
  }); 

  socket.on("set-basic-auth", function (data) {
    $("#message").append("Setting basic authorization.").append($("<br/>"));
  });
}

// Initial Setup
$(function () {
  $("span.host-name").text(frontEnvironment.origin());
});

