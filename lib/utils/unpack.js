'use strict';

var path = require('path');
var chalk = require('chalk');
var packer = require('dir-packer');

function unpack(file, opts) {
  opts = opts || {};

  if (!opts.destPath) {
    throw new Error('opts.destPath is required');
  }
  if (!opts.env) {
    throw new Error('opts.env is required');
  }

  var packPath = file.path;

  console.log('Received package ' + opts.name);

  var dest = path.join(opts.destPath, opts.env, opts.name);

  packer.unpack(packPath, dest)
    .then(function() {
      console.log(chalk.magenta(opts.name) + ' package updated on ' +
        chalk.magenta(opts.env) + ' environment');
    })
    .catch(function(err) {
      console.log(err);
    });
}

module.exports = unpack;
