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

app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.multipart());

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
  response.emit('post-message', req, res);
});

app.put('/', function(req, res) {
  response.emit('post-message', req, res);
});

response.on('post-message', function(req, res) {
  io.sockets.emit('post-message', { message: JSON.stringify(req.body) }); 
  res.send({ response: "OK" });
});
