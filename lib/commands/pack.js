'use strict';

var targz = require('tar.gz');
var path = require('path');
var packageReader = require('../utils/package-reader');

function pack(currentDir) {
  if (!currentDir) {
    throw new Error('currentDir is required');
  }
  var ungPkg = packageReader(currentDir);
  var src = path.join(currentDir, ungPkg.src || './_build');
  var dest = path.join(currentDir, ungPkg.name + '.tar.gz');

  new targz().compress(src, dest, function(err) {
    if (err) {
      console.log(err);
    }

    console.log('The compression has ended!');
  });
}

module.exports = pack;
