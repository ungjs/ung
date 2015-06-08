'use strict';

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var postPublish = require('./routes/publish');

module.exports = function(destPath, opts, cb) {
  var app = connect();
  app.use(serveStatic(destPath));
  app.use('/publish', postPublish(destPath));
  http.createServer(app).listen(opts.port, opts.ip, cb);
};
