'use strict';

var path = require('path');
var packageReader = require('../utils/package-reader');
var execCmds = require('exec-cmds');
var chalk = require('chalk');
var packer = require('dir-packer');

function pack(currentDir) {
  if (!currentDir) {
    throw new Error('currentDir is required');
  }
  var pkg = packageReader(currentDir);
  var src = path.join(currentDir, pkg.ungConfig.src);

  var dest = path.join(currentDir, pkg.name + '-' + pkg.version +
    '.tar.gz');

  console.log('Packing resources for ' + chalk.magenta(pkg.name + '@' +
    pkg.version));

  execCmds(pkg.ungConfig.bundle, currentDir);

  return packer.pack(src, dest);
}

module.exports = pack;
