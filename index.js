var url = require('url');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000
  , moment = require('moment')
  , rawBody = require('./lib/middleware/rawbody')
  , swig = require('./lib/swig');

var response = require('./app/model/response')(io);

var basicAuth = require('./lib/middleware/basic_auth')
  , basicAuthAdmin = basicAuth.admin
  , basicAuthUser = basicAuth.user
  , basicAuthModel = require('./app/model/basic_auth')
  , basicAuthSetSetting = basicAuthModel.set;

app.engine('html', swig.express3);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.set('view cache', false);

app.use(express.static(__dirname + '/public'));
app.use(rawBody);

io.configure(function() {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

server.listen(port);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  response.emit('send-message', { method: "post", basic: false }, req, res);
});

app.put('/', function(req, res) {
  response.emit('send-message', { method: "put", basic: false }, req, res);
});

app.post('/basic/set', basicAuthAdmin, function(req, res) {
  var parseQuery = url.parse('?' + req.rawBody, true).query;
  basicAuthSetSetting(parseQuery);
  response.emit('set-basic-auth', { status: "OK" }, req, res);
});

app.post('/basic', basicAuthUser, function(req, res) {
  response.emit('send-message', { method: "post", basic: true }, req, res);
});

app.put('/basic', basicAuthUser, function(req, res) {
  response.emit('send-message', { method: "put", basic: true }, req, res);
});
