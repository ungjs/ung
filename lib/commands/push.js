'use strict';

var packageReader = require('../utils/package-reader');
var request = require('request');

function push(opts) {
  opts = opts || {};

  if (!opts.currentDir) {
    throw new Error('opts.currentDir is required');
  }
  if (!opts.bundle) {
    throw new Error('opts.bundleName is required');
  }
  if (!opts.packages) {
    throw new Error('opts.packages is required');
  }

  var ungPkg = packageReader(opts.currentDir);
  var serverHost = (ungPkg[opts.env] || {}).serverHost ||
    ungPkg.serverHost || 'localhost:9595';
  var endpoint = 'http://' + serverHost + '/push';

  request({
    method: 'POST',
    url: endpoint,
    json: {
      bundle: opts.bundle,
      packages: opts.packages
    }
  }, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Successfully pushed');
  });
}

module.exports = push;
