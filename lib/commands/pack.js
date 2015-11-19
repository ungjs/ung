'use strict';

var path = require('path');
var packageReader = require('../utils/package-reader');
var execCmds = require('exec-cmds');
var async = require('async');
var chalk = require('chalk');
var packer = require('dir-packer');

function pack(currentDir, opts) {
  opts = opts || {};

  if (!currentDir) {
    throw new Error('currentDir is required');
  }
  var ungPkg = packageReader(currentDir);
  var src = path.join(currentDir, ungPkg.src || './_build');
  var envs = opts.envs && opts.envs.length ? opts.envs : ['dev'];

  async.eachSeries(envs, function(env, next) {
    var envOpts = ungPkg.envs[env];

    if (!envOpts) {
      console.log('You can\'t for ' + chalk.magenta(env) +
                  'because it is not specified in ung.json');
    }

    var cmds = envOpts.cmds || [];
    var dest = path.join(currentDir, ungPkg.name + '-' + env + '.tar.gz');

    console.log('Packing resources for ' + chalk.magenta(env));

    execCmds(cmds, currentDir);

    packer.pack(src, dest)
      .then(function() {
        console.log('The compression has ended!');
        next();
      })
      .catch(function(err) {
        console.log('Error during compressing');
        console.log(err);
        next();
      });
  });
}

module.exports = pack;
