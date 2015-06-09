'use strict';

var path = require('path');
var chalk = require('chalk');
var spawn = require('cross-spawn');

function executeCommand(cmd, args, cwd, cb) {
  console.log(chalk.yellow('Executing: ') + cmd + ' ' + args.join(' '));

  var child = spawn(cmd, args, {
    cwd: cwd
  });
  var result = '';

  child.stdout.on('data', function(buffer) {
    console.log(chalk.grey(buffer.toString()));
    result += buffer.toString();
  });

  child.stderr.on('data', function(buffer) {
    console.log(chalk.red(buffer.toString()));
  });

  child.stdout.on('end', function() {
    cb(result);
  });
}

function exec(cmds, cwd, cb) {
  if (cmds && cmds.length) {
    var cmd = cmds.shift();
    if (cmd.length > 0) {
      executeCommand(cmd[0], cmd.splice(1), cwd, function() {
        console.log(chalk.yellow('Finished: ') + cmd.join(' '));
        exec(cmds, cwd, cb);
      });
    }
  } else {
    console.log(chalk.cyan('Finished executing the commands'));
    cb();
  }
}

module.exports = exec;
