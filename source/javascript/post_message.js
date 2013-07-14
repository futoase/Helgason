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
  return io.connect(hostInfo.origin());
}

/**
 * Bind Event to socket.
 *
 * @params socket Socket.io object.
 * @return void
 */
function bindEvent(socket) {
  socket.on("send-message", function (data) {
    var message = $("<p/>").css({ margin: "2px"});
    if (data.status.basic === true) {
      message.append($("<span/>").text("[Basic Auth: YES]"));
    }
    else {
      message.append($("<span/>").text("[Basic Auth: NO ]"));
    }

    message.append($("<span/>").text(
      "[" + data.status.method.toUpperCase() + "]"
    ));

    message.append($("<span/>").text(
      "   " + JSON.stringify(data.message)
    ));

    $("#message").prepend(message);
  }); 

  socket.on("set-basic-auth", function (data) {
    var message = $("<p/>").css({ margin: "1px" });
    message.append($("<span/>").text("Setting basic authorization."));
    $("#message").append(message);
  });
}
