module.exports = function (io) { 
  var EventEmitter = require('events').EventEmitter
    , response = (new EventEmitter);

  response.on('send-message', function(status, req, res) {
    io.sockets.emit('send-message', { 
      status: status, 
      message: req.rawBody
    });
    res.send({ response: "OK" });
  });
  
  response.on('set-basic-auth', function(status, req, res) {
    io.sockets.emit('set-basic-auth', {
      status: status
    });
    res.send({ response: "OK" });
  });

  return response;
}
