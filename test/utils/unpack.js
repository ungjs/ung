'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');
var _ = require('lodash');
var normalize = require('normalize-path');

describe('unpack', function() {
  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('should unpack the package', function(done) {
    done = _.after(5, done);

    var file = {
      path: '/path/to/package.tar.gz'
    };
    var opts = {
      tmpPath: '/path/to/tmp',
      env: 'prod',
      name: 'foo',
      destPath: '/dest/path'
    };

    mockery.registerMock('tar.gz', function TarGz() {
      this.extract = function(src, target, cb) {
        expect(normalize(src)).to.equal(file.path);
        expect(normalize(target)).to.equal(opts.tmpPath);
        expect(cb).to.be.a('function');
        cb(null);
        done();
      };
    });

    var firstRimrafCall = true;
    mockery.registerMock('rimraf', function(target, cb) {
      if (firstRimrafCall) {
        firstRimrafCall = false;
        expect(normalize(target)).to.equal(file.path);
      } else {
        expect(normalize(target)).to.equal(opts.tmpPath + '/_build');
      }
      cb(null);
      done();
    });

    mockery.registerMock('mkdirp', {
      sync: function(folderPath) {
        expect(normalize(folderPath)).to.equal('/dest/path/prod/foo');
        done();
      }
    });

    mockery.registerMock('ncp', {
      ncp: function(src, dest, cb) {
        expect(normalize(src)).to.equal(opts.tmpPath + '/_build');
        expect(normalize(dest)).to.equal('/dest/path/prod/foo');
        expect(cb).to.be.a('function');
        cb(null);
        done();
      }
    });

    mockery.registerAllowables([
      '../../lib/utils/unpack',
      'path',
      'chalk',
      /* the stuff inside chalk */
      'escape-string-regexp',
      'ansi-styles',
      'strip-ansi',
      'ansi-regex',
      'has-ansi',
      'supports-color'
    ]);

    var unpack = require('../../lib/utils/unpack');
    unpack(file, opts);
  });
});
