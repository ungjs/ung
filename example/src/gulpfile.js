'use strict';

var gulp = require('gulp');
var foso = require('foso');
var js = require('fosify-js');

gulp.task('build', function() {
  foso
    .please({
      src: './'
    })
    .fosify(js)
    .now();
});
