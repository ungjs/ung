#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package');
var pack = require('./commands/pack');
var push = require('./commands/push');
var updateNotifier = require('update-notifier');
var path = require('path');
var publish = require('./commands/publish');

function notify() {
  updateNotifier({
    pkg: pkg
  }).notify({
    defer: false
  });
}

notify();

program
  .version(pkg.version);

program
  .command('pack')
  .usage('[options]')
  .description('Packs ung package')
  .action(function() {
    var currentDir = path.resolve(process.cwd());

    pack(currentDir)
      .then(function(file) {
        console.log('We\'re all packed up!');
        console.log(file);
      })
      .catch(function(err) {
        console.log('Error during packing');
        console.log(err);
      });
  });

program
  .command('publish')
  .usage('[options]')
  .description('Publishes ung package')
  .action(function(env) {
    var currentDir = path.resolve(process.cwd());

    pack(currentDir)
      .then(function(file) {
        console.log('We\'re all packed up!');
        console.log(file);

        publish({
          currentDir: currentDir,
          packagePath: file
        });
      })
      .catch(function(err) {
        console.log('Error during packing');
        console.log(err);
      });
  });

program
  .command('push [targetBundle] [packages...]')
  .usage('[options]')
  .description('Pushes some packages to a bundle')
  .action(function(targetBundle, packages) {
    var currentDir = path.resolve(process.cwd());
    push({
      currentDir: currentDir,
      bundle: targetBundle,
      packages: packages
    });
  });

program.parse(process.argv);
