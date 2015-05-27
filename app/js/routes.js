'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('app', {
    url: '/{lang:(?:bg|en)}',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.home', {
    url: '',
    templateUrl: 'home.html'
  })
  .state('app.home.news', {
    url: '/news',
    template: '<div>news</div>'
  })
  .state('app.home.analysis', {
    url: '/analysis',
    template: '<div>analysis</div>'
  })
  .state('app.home.events', {
    url: '/events',
    template: '<div>events</div>'
  })
  .state('app.home.energopedia', {
    url: '/energopedia',
    template: '<div>energopedia</div>'
  })
  .state('app.home.partners', {
    url: '/partners',
    template: '<div>partners</div>'
  });


  $urlRouterProvider
    .when('/', '/bg')
    .otherwise('/bg');
}

module.exports = Routes;
