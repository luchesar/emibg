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
      .state('app.menu', {
        url: '',
        templateUrl: 'menu.html'
      })
      .state('app.menu.news', {
        url: '/news',
        template: '<div>news</div>'
      })
      .state('app.menu.analysis', {
        url: '/analysis',
        template: '<div>analysis</div>'
      })
  .state('app.menu.events', {
    url: '/events',
    template: '<div>events</div>'
  })
  .state('app.menu.energopedia', {
    url: '/energopedia',
    template: '<div>energopedia</div>'
  })
  .state('app.menu.partners', {
    url: '/partners',
    template: '<div>partners</div>'
  });


  $urlRouterProvider
    .when('/', '/bg')
    .otherwise('/bg');
}

module.exports = Routes;
