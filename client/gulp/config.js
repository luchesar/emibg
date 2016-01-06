'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'client/app/styles/**/*.scss',
    'dest': 'build/client/css',
    'css' : [
      'node_modules/angular-material/angular-material.css',
      'node_modules/angular-chart.js/dist/angular-chart.css',
      'node_modules/fullcalendar/dist/fullcalendar.css',
      'client/app/styles/fontello/**/*.css'
    ],
    'destCss': 'build/client/css/styles.css'
  },

  'scripts': {
    'src' : ['client/app/js/**/*.js'],
    'dest': 'build/client/js'
  },

  'images': {
    'src' : 'client/app/images/**/*',
    'dest': 'build/client/images'
  },

  'fonts': {
    'src' : ['client/app/fonts/**/*', 'node_modules/bootstrap-sass/assets/fonts/**/*'],
    'dest': 'build/client/fonts'
  },

  'views': {
    'watch': [
      'client/app/index.html',
      'client/app/views/**/*.html'
    ],
    'src': 'client/app/views/**/*.html',
    'dest': 'client/app/js'
  },

  'gzip': {
    'src': 'build/client/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/client/',
    'options': {}
  },

  'dist': {
    'root'  : 'build/client/'
  },

  'browserify': {
    'entries'   : ['./client/app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'client/test/karma.conf.js',
    'protractor': 'client/test/protractor.conf.js'
  }

};
