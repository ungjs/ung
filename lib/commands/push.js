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

  var pkg = packageReader(opts.currentDir);
  var endpoint = pkg.ungConfig.registry + '/push';

  request({
    method: 'POST',
    url: endpoint,
    json: {
      bundle: opts.bundle,
      packages: opts.packages,
      deletePackages: opts.deletePackages
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
