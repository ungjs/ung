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
  .command('init')
  .usage('[options]')
  .description('Bundles Foso scripts')
  .option('-m, --minify', 'Minify the resources')
  .option('-e, --env <env>', 'set the environment for which to bundle the scripts')
  .option('-h, --host <host>', 'the host on which the scripts are served. E.g. -h example.com. ' +
          'Note: only use when the secure and non-secure hostname are the same. ' +
          'Otherwise use origin and secure-origin to pass the different addresses.')
  .option('-s, --secure-host <hostSecure>', 'the secure host on which the scripts are served. E.g. -s secure.example.com. ' +
          'Only has to be specified if the secure host is not the same as the non-secure one.')
  .action(function(opts) {
    notify();

  });

program
  .command('pack')
  .usage('[options]')
  .description('Bundles Foso scripts')
  .option('-m, --minify', 'Minify the resources')
  .option('-e, --env <env>', 'set the environment for which to bundle the scripts')
  .option('-h, --host <host>', 'the host on which the scripts are served. E.g. -h example.com. ' +
          'Note: only use when the secure and non-secure hostname are the same. ' +
          'Otherwise use origin and secure-origin to pass the different addresses.')
  .option('-s, --secure-host <hostSecure>', 'the secure host on which the scripts are served. E.g. -s secure.example.com. ' +
          'Only has to be specified if the secure host is not the same as the non-secure one.')
  .action(function(opts) {
    notify();
    var currentPath = path.resolve(process.cwd());

    pack({
      src: path.join(currentPath, './_build'),
      dest: path.join(currentPath, './ung.tar.gz')
    });
  });

program
  .command('publish')
  .usage('[options]')
  .description('Bundles Foso scripts')
  .option('-m, --minify', 'Minify the resources')
  .option('-e, --env <env>', 'set the environment for which to bundle the scripts')
  .option('-h, --host <host>', 'the host on which the scripts are served. E.g. -h example.com. ' +
          'Note: only use when the secure and non-secure hostname are the same. ' +
          'Otherwise use origin and secure-origin to pass the different addresses.')
  .option('-s, --secure-host <hostSecure>', 'the secure host on which the scripts are served. E.g. -s secure.example.com. ' +
          'Only has to be specified if the secure host is not the same as the non-secure one.')
  .action(function(opts) {
    notify();

    publish('./ung.tar.gz', 'http://localhost:9595/publish');
  });

program
  .command('serve')
  .usage('[options]')
  .description('Bundles Foso scripts')
  .option('-m, --minify', 'Minify the resources')
  .option('-e, --env <env>', 'set the environment for which to bundle the scripts')
  .option('-h, --host <host>', 'the host on which the scripts are served. E.g. -h example.com. ' +
          'Note: only use when the secure and non-secure hostname are the same. ' +
          'Otherwise use origin and secure-origin to pass the different addresses.')
  .option('-s, --secure-host <hostSecure>', 'the secure host on which the scripts are served. E.g. -s secure.example.com. ' +
          'Only has to be specified if the secure host is not the same as the non-secure one.')
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
