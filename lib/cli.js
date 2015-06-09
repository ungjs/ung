#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package');
var pack = require('./pack');
var updateNotifier = require('update-notifier');
var path = require('path');
var serve = require('./serve');
var publish = require('./publish');

program
  .version(pkg.version);

program
  .command('pack')
  .usage('[options]')
  .description('Packs ung package')
  .action(function(opts) {
    notify();
    var currentDir = path.resolve(process.cwd());

    pack(currentDir);
  });

program
  .command('publish')
  .usage('[options]')
  .description('Publishes ung package')
  .action(function(opts) {
    notify();

    publish('./ung.tar.gz', 'http://localhost:9595/publish');
  });

program
  .command('serve')
  .usage('[options]')
  .description('Serves ung packages')
  .action(function(opts) {
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
