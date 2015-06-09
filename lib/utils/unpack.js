'use strict';

var targz = require('tar.gz');
var path = require('path');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
var chalk = require('chalk');

function unpack(file, opts) {
  opts = opts || {};

  if (!opts.tmpPath) {
    throw new Error('opts.tmpPath is required');
  }
  if (!opts.destPath) {
    throw new Error('opts.destPath is required');
  }
  if (!opts.env) {
    throw new Error('opts.env is required');
  }

  var packPath = file.path;

  console.log('Received package ' + opts.name);

  new targz().extract(packPath, opts.tmpPath, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Extracted!');

    rimraf(packPath, function(err) {
      if (err) {
        console.log(err);
      }
    });

    var src = path.join(opts.tmpPath, './_build');
    var dest = path.join(opts.destPath, opts.env, opts.name);
    mkdirp.sync(dest);
    ncp(src, dest, function(err) {
      if (err) {
        console.log(err);
      }
      console.log(chalk.magenta(opts.name) + ' package updated on ' + chalk.magenta(opts.env) + ' environment');

      rimraf(src, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
}

module.exports = unpack;
