'use strict';

var targz = require('tar.gz');
var path = require('path');

function pack(currentDir) {
  if (!currentDir) {
    throw new Error('currentDir is required');
  }
  var ungPkg = require(path.join(currentDir, './ung.json'));
  if (!ungPkg.name) {
    throw new Error('ung.json has to contain a name');
  }
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
