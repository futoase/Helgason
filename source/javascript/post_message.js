function initSocketIoConnection() {
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
