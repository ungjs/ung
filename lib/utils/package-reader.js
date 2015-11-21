'use strict';

var readPkgUp = require('read-pkg-up');

function packageReader(dir) {
  if (!dir) {
    throw new Error('dir is required');
  }

  var pkg = readPkgUp.sync(dir).pkg;
  pkg.ungConfig = pkg.ungConfig || {};
  pkg.ungConfig.registry = pkg.ungConfig.registry || 'http://localhost:9595';
  pkg.ungConfig.src = pkg.ungConfig.src || './dist';
  return pkg;
}

module.exports = packageReader;
