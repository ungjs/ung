'use strict';

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var postPublish = require('../routes/publish');
var postPublishFile = require('../routes/publish-file');

module.exports = function(destPath, opts, cb) {
  cb = cb || function() {};
  var app = connect();
  app.use(serveStatic(destPath));
  app.use('/publish', postPublish(destPath));
  app.use('/publish-file', postPublishFile(destPath));
  http.createServer(app).listen(opts.port, opts.ip, function(err) {
    if (err) {
      return cb(err);
    }

    console.log('--------------------------------------');
    console.log('');
    console.log('  Ung server started');
    console.log('  Hosted on http://localhost:' + opts.port);
    console.log('  Press Ctrl+C to stop the server');
    console.log('');
    console.log('--------------------------------------');
    cb();
  });
};
