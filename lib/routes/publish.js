'use strict';

var formidable = require('formidable');
var util = require('util');
var targz = require('tar.gz');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function(destPath) {
  var tmpPath = path.join(destPath, './tmp');
  mkdirp.sync(tmpPath);

  return function(req, res) {
    if (req.method.toLowerCase() !== 'post') {
      return;
    }
    var form = new formidable.IncomingForm();

    form.on('fileBegin', function(name, file) {
      file.path = path.join(tmpPath, file.name);
    });

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));

      console.log(files);
    });

    form.on('end', function(fields, files) {
      var tempPath = this.openedFiles[0].path;

      new targz().extract(tempPath, destPath, function(err) {
        if (err) {
          console.log(err);
        }

        console.log('The extraction has ended!');
      });
    });
  };
};
