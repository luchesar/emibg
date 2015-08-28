'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var concat       = require('gulp-concat');

gulp.task('css', function () {
  return gulp.src(config.styles.css)
    .pipe(minifyCss())
    .pipe(concat(config.styles.destCss))
    .on('error', handleErrors)
    .pipe(gulp.dest('./'))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});

gulp.task('styles', ['css'], function () {
  return gulp.src(config.styles.src)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
});


