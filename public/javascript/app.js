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


function postMessage(setting) {
  // Set client by use of socket.io.
  var socket = io.connect(frontEnvironment.origin(setting));

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

