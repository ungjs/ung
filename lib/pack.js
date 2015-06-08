'use strict';

var targz = require('tar.gz');

function pack(opts) {
  opts = opts || {};

  if (!opts.src) {
    throw new Error('opts.src is required');
  }
  console.log(opts.dest);
  if (!opts.dest) {
    throw new Error('opts.dest is required');
  }

  new targz().compress(opts.src, opts.dest, function(err){
    if(err) {
        console.log(err);
    }

    console.log('The compression has ended!');
  });
}

module.exports = pack;
