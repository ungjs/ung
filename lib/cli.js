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

    pack(currentDir);
  });

program
  .command('publish [envs...]')
  .usage('[options]')
  .description('Publishes ung package')
  .action(function(envs) {
    notify();
    var currentDir = path.resolve(process.cwd());

    publish({
      currentDir: currentDir,
      endpoint: 'http://localhost:9595/publish',
      envs: envs || ['dev']
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
