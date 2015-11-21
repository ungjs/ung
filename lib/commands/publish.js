'use strict';

var request = require('request');
var fs = require('fs');
var packageReader = require('../utils/package-reader');
var path = require('path');

function publish(opts) {
  opts = opts || {};

  if (!opts.currentDir) {
    throw new Error('opts.currentDir is required');
  }
  if (!opts.packagePath) {
    throw new Error('opts.packagePath is required');
  }

  var pkg = packageReader(opts.currentDir);
  var endpoint = pkg.ungConfig.registry + '/publish';

  var req = request.post(endpoint, function(err, res, body) {
    if (err) {
      console.log(err);
      console.log('Error!');
    } else {
      console.log('Success!');
    }
  });

  var form = req.form();
  form.append('version', pkg.version);
  form.append('name', pkg.name);
  form.append('file', fs.createReadStream(opts.packagePath));
}

module.exports = publish;
