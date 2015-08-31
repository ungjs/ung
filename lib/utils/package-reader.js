'use strict';

var path = require('path');
var yamlOrJSON = require('yaml-or-json');

function packageReader(dir) {
  if (!dir) {
    throw new Error('dir is required');
  }

  var ungPkg = yamlOrJSON(path.join(dir, './ung'));
  if (!ungPkg.name) {
    throw new Error('ung.json has to contain a name');
  }
  return ungPkg;
}

module.exports = packageReader;
