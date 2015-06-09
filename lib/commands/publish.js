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
  if (!opts.endpoint) {
    throw new Error('opts.currentDir is required');
  }

  var req = request.post(opts.endpoint, function(err, res, body) {
    if (err) {
      console.log(err);
      console.log('Error!');
    } else {
      console.log('Success!');
    }
  });
  var ungPkg = packageReader(opts.currentDir);
  var fpath = path.join(opts.currentDir, ungPkg.name + '.tar.gz');
  var form = req.form();
  form.append('envs', opts.envs.join(','));
  form.append('file', fs.createReadStream(fpath));
}

module.exports = publish;
