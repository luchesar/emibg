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
require('angular-touch');
require('angular-bootstrap-npm');
require('angular-translate');
require('angular-chart.js');
require('angular-ui-calendar');
require('angular-resource');
require('angular-ui-tinymce');
require('angular-ui-bootstrap');
require('angular-cookies');
require('angular-bootstrap-datetimepicker');
require('angular-google-analytics');
require('../../node_modules/angular-google-picker/src/google-picker');
require('../../node_modules/angular-bind-html-compile/angular-bind-html-compile.js');
require('./ext/imgLiquid');
require('./lb-services.js');
require('../../node_modules/angular-ui-grid/ui-grid.js');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');
require('./filters/_index');

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
    'ui.bootstrap',
    'pascalprecht.translate',
    'chart.js',
    'ui.calendar',
    'ui.bootstrap',
    'ngCookies',
    'lk-google-picker',
    'ngResource',
    'lbServices',
    'ui.tinymce',
    'ui.bootstrap.datetimepicker',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'angular-bind-html-compile',
    'angular-google-analytics'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires)
    .constant('AppSettings', require('./constants'))
    .config(require('./routes'))
    .config(require('./translations'))
    .config(require('./google-picker-config'))
    .config(require('./http-auth'))
    .run(require('./on_run'));

  angular.bootstrap(document, ['app']);
});
