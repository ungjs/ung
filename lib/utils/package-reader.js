'use strict';

var path = require('path');

function packageReader(dir) {
  if (!dir) {
    throw new Error('dir is required');
  }

  var ungPkg = require(path.join(dir, './ung.json'));
  if (!ungPkg.name) {
    throw new Error('ung.json has to contain a name');
  }
  return ungPkg;
}

module.exports = packageReader;
