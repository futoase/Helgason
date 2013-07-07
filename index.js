var EventEmitter = require('events').EventEmitter;
var swig = require('swig');

swig._cache = {};
swig.express3 = function (path, options, fn) {
  swig._read(path, options, function (err, str) {
    if (err) { 
      return fn(err); 
    }
    try {
      options.filename = path;
      var tmpl = swig.compile(str, options);
      fn(null, tmpl(options));
    } catch (error) {
      fn(error);
    }
  });
};

swig._read = function (path, options, fn) {
  var str = swig._cache[path];
  if (options.cache && str && typeof str == 'string') {
    return fn(null, str);
  }
  require('fs').readFile(path, 'utf8', function (err, str) {
    if (err) {
      return fn(err);
    }
    if (options.cache) {
      swig._cache[path] = str;
    }
    fn(null, str);
  });
};

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000;

app.engine('html', swig.express3);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.set('view cache', false);

swig.init({
  root: __dirname + '/views',
  allowErrors: true
});

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
  io.sockets.emit('hello-world-message', { message: "Hello world" }); 
  res.send({ response: "OK" });
});

response.on('post-message', function(req, res) {
  io.sockets.emit('hello-world-message', { message: "Hello world" }); 
  res.send({ response: "OK" });
});
