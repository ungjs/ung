'use strict';

var targz = require('tar.gz');
var path = require('path');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var async = require('async');
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
  if (!opts.envs) {
    throw new Error('opts.envs is required');
  }

  var packPath = file.path;
  var pkgName = file.name.replace('.tar.gz', '');
  
  console.log('Received package ' + pkgName);

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

    async.eachSeries(opts.envs, function(env, next) {
      var dest = path.join(opts.destPath, env, pkgName);
      mkdirp.sync(dest);
      ncp(src, dest, function(err) {
        if (err) {
          console.log(err);
        }
        console.log(chalk.magenta(pkgName) + ' package updated on ' + chalk.magenta(env) + ' environment');
        next();
      });
    }, function() {
      rimraf(src, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
}

module.exports = unpack;
