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
  var ungPkg = packageReader(currentDir);
  var src = path.join(currentDir, ungPkg.src || './_build');

  var dest = path.join(currentDir, ungPkg.name + '-' + ungPkg.version +
    '.tar.gz');

  console.log('Packing resources for ' + chalk.magenta(ungPkg.name + '@' +
    ungPkg.version));

  execCmds(ungPkg.cmds, currentDir);

  return packer.pack(src, dest);
}

module.exports = pack;
