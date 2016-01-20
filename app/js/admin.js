'use strict';

window.moment = require('moment');
window.jQuery = require('jquery');
window.$ = window.jQuery;
require('fullcalendar');
require('fullcalendar/dist/lang-all.js')

var angular = require('angular');
// angular modules
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-touch');
require('angular-bootstrap-npm');
require('angular-translate');
require('angular-chart.js');
require('angular-ui-calendar');
require('angular-resource');
require('angular-ui-tinymce');
require('./ext/imgLiquid');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');
require('./filters/_index');
require('./lb-services.js');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters',
    'ngTouch',
    'ngMaterial',
    'ui.bootstrap',
    'pascalprecht.translate',
    'chart.js',
    'ui.calendar',
    'ngResource',
    'lbServices',
    'ui.tinymce'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires)
    .constant('AppSettings', require('./constants'))
    .config(require('./routes'))
    .config(require('./translations'))
    .run(require('./on_run'));

  angular.bootstrap(document, ['app']);
});
