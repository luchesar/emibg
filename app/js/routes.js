'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider
    .when('/', '/bg/home')
    .otherwise('/bg');

  $stateProvider
  .state('app', {
    url: '/{lang:(?:bg|en)}',
    templateUrl: 'home.html'
  })
}

module.exports = Routes;
