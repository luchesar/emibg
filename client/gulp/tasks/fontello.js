'use strict';

var gulp    = require('gulp');
var config  = require('../config');

gulp.task('fontello', function() {
  var fontello = require('fontello-installer');

  fontello.run({
    config:'app/fontello-config.json',
    cssPath:'app/styles/fontello/',
    cssFontPath:'images/fontello/',
    fontPath:'app/images/fontello/'
  });
  console.log("Fontello task finished");
});

