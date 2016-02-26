'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'app/styles/**/*.scss',
    'dest': 'build/css',
    'css' : [
      'node_modules/angular-chart.js/dist/angular-chart.css',
      'node_modules/fullcalendar/dist/fullcalendar.css',
      'node_modules/bootstrap-social/bootstrap-social.css',
      'node_modules/bootstrap-social/assets/css/font-awesome.css',
      'node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
      'node_modules/angular-ui-grid/ui-grid.css',
      'app/styles/fontello/**/*.css'
    ],
    'destCss': 'build/css/styles.css'
  },

  'scripts': {
    'src' : ['app/js/**/*.js'],
    'dest': 'build/js'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src' : [
      'app/fonts/**/*', 
      'node_modules/bootstrap-sass/assets/fonts/**/*',
      'node_modules/bootstrap-social/assets/fonts/**/*'
    ],
    'dest': 'build/fonts'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/js'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'browserifyAdmin': {
    'entries'   : ['./app/js/admin.js'],
    'bundleName': 'admin.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
