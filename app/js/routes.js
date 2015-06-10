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
    abstract: true,
    template: '<ui-view/>',
    title: 'Energy Management Institute'
  })
  .state('app.menu', {
    url: '',
    templateUrl: 'menu.html'
  })
  .state('app.menu.home', {
    url: '/home',
    templateUrl: 'fragments/slider.html'
  })
  .state('app.menu.news', {
    url: '/news',
    templateUrl: 'fragments/news.html'
  })
  .state('app.menu.analysis', {
    url: '/analysis',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.menu.analysis.emis', {
    url: '/emis',
    template: '<div>analysis.emis</div>'
  })
  .state('app.menu.analysis.summaries', {
    url: '/summaries',
    template: '<div>analysis.summaries</div>'
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
  })
  .state('app.menu.about', {
    url: '/about',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.menu.about.details', {
    url: '/details',
    template: '<div>about.details</div>'
  })
  .state('app.menu.about.contact', {
    url: '/contact',
    template: '<div>about.contact</div>'
  })
}

module.exports = Routes;
