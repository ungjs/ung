'use strict';

var targz = require('tar.gz');
var path = require('path');
var packageReader = require('../utils/package-reader');
var execCmds = require('../utils/exec-commands');
var async = require('async');
var rimraf = require('rimraf');
var chalk = require('chalk');

function pack(currentDir, opts) {
  opts = opts || {};
  
  if (!currentDir) {
    throw new Error('currentDir is required');
  }
  var ungPkg = packageReader(currentDir);
  var src = path.join(currentDir, ungPkg.src || './_build');
  var cmds = ungPkg.cmds || {};

  async.eachSeries(opts.envs || ['dev'], function(env, next) {
    var envCmds = cmds[env] || [];
    var dest = path.join(currentDir, ungPkg.name + '-' + env + '.tar.gz');
    
    console.log('Packing resources for ' + chalk.magenta(env));
    execCmds(envCmds, currentDir, function() {
      new targz().compress(src, dest, function(err) {
        if (err) {
          console.log(err);
        }

        console.log('The compression has ended!');
        next();
      });
    });
  });
}

module.exports = pack;
