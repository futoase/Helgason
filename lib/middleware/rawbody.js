module.exports = function (req, res, next) {
  var data = '';
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function (chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function () {
    next();
  });
};

