var EventEmitter = require('events').EventEmitter;
var swig = require('./lib/swig');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000;

app.engine('html', swig.express3);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.set('view cache', false);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.multipart());

io.configure(function() {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

server.listen(port);

app.get('/', function(req, res) {
  res.render('index', {
    hostname: 'localhost',
    port: port
  });
});

var response = (new EventEmitter);

app.post('/', function(req, res) {
  response.emit('send-message', { method: "post", basic: false }, req, res);
});

app.put('/', function(req, res) {
  response.emit('send-message', { method: "put", basic: false }, req, res);
});

var appSetting = require('./setting')
  , appOption = appSetting.option
  , basicAuthSetting = appSetting.basicAuth;

var basicAuthAdmin = express.basicAuth(function(user, pass) {
  return (user == basicAuthSetting.user && pass == basicAuthSetting.pass);
});

var moment = require('moment');

var basicAuthUserSetting = {};
var basicAuthUser = express.basicAuth(function(user, pass) {
  var now = moment().format();
  var passSuccess = (
    user == basicAuthUserSetting.user &&  
    pass == basicAuthUserSetting.pass &&
    now <= basicAuthUserSetting.date
  );
  return passSuccess;
});

app.post('/basic/set', basicAuthAdmin, function(req, res) {
  basicAuthUserSetting.date = moment().add(
    'seconds', appOption.availableSeconds
  ).format();
  basicAuthUserSetting.user = req.body.user;
  basicAuthUserSetting.pass = req.body.pass;
  response.emit('set-basic-auth', { status: "OK" }, req, res);
});

app.post('/basic', basicAuthUser, function(req, res) {
  response.emit('send-message', { method: "post", basic: true }, req, res);
});

app.put('/basic', basicAuthUser, function(req, res) {
  response.emit('send-message', { method: "put", basic: true }, req, res);
});

response.on('send-message', function(status, req, res) {
  io.sockets.emit('send-message', { 
    status: status, 
    message: req.body
  }); 
  res.send({ response: "OK" });
});

response.on('set-basic-auth', function(status, req, res) {
  io.sockets.emit('set-basic-auth', {
    status: status
  });
  res.send({ response: "OK" });
});
