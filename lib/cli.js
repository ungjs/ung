#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package');
var pack = require('./commands/pack');
var updateNotifier = require('update-notifier');
var path = require('path');
var serve = require('./commands/serve');
var publish = require('./commands/publish');

program
  .version(pkg.version);

program
  .command('pack')
  .usage('[options]')
  .description('Packs ung package')
  .action(function() {
    notify();
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
    notify();
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
  .command('serve')
  .usage('[options]')
  .description('Serves ung packages')
  .action(function() {
    notify();

    var currentPath = path.resolve(process.cwd());
    serve(currentPath, {
      port: 9595,
      ip: '0.0.0.0'
    });
  });

function notify() {
  updateNotifier({
    pkg: pkg
  }).notify({
    defer: false
  });
}

program.parse(process.argv);
