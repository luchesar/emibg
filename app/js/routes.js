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
    abstract: true
  })
  .state('app.search', {
    url: '',
    views: {
       'menu@': { templateUrl: 'search-menu.html' },
       'content@': { template: '<ui-view/>' }
    }
  })
  .state('app.search.result', {
    url: '/search?{q:string}&{page:int}',
    templateUrl: 'search.html'
  })
  .state('app.search.result.event', {
    url: '/event/{id:string}',
    templateUrl: 'fragments/full-event.html'
  })
  .state('app.search.result.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html'
  })
  .state('app.menu', {
    url: '',
    views: {
       'menu@': { templateUrl: 'menu.html' },
       'content@': { template: '<ui-view/>' }
    }
  })
  .state('app.menu.home', {
    url: '/home',
    templateUrl: 'fragments/home.html'
  })
  .state('app.menu.home.event', {
    url: '/event/{id:string}',
    templateUrl: 'fragments/full-event.html'
  })
  .state('app.menu.home.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html'
  })
  .state('app.menu.news', {
    url: '/news/{page:int}',
    templateUrl: 'fragments/news.html'
  })
  .state('app.menu.news.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html'
  })
  .state('app.menu.analysis', {
    url: '/analysis',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.menu.analysis.emis', {
    url: '/emis/{page:int}',
    templateUrl: 'fragments/emis-analysis.html'
  })
  .state('app.menu.analysis.emis.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html'
  })
  .state('app.menu.analysis.summaries', {
url: '/summaries/{page:int}',
    templateUrl: 'fragments/summaries-analysis.html'
  })
  .state('app.menu.analysis.summaries.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html'
  })
  .state('app.menu.events', {
    url: '/events/{page:int}',
    templateUrl: 'fragments/events.html'
  })
  .state('app.menu.events.event', {
    url: '/event/{id:string}',
    templateUrl: 'fragments/full-event.html'
  })
  .state('app.menu.energopedia', {
    url: '/energopedia',
    templateUrl: 'fragments/energopedia.html'
  })
  .state('app.menu.partners', {
    url: '/partners',
    templateUrl: 'fragments/partners.html'
  })
  .state('app.menu.about', {
    url: '/about',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.menu.about.mission', {
    url: '/mission',
    templateUrl: 'fragments/about_mission.html'
  })
  .state('app.menu.about.team', {
    url: '/team',
    templateUrl: 'fragments/about_team.html'
  })
  .state('app.menu.about.contact', {
    url: '/contact',
    templateUrl: 'fragments/about_contact.html'
  })
  .state('app.menu.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html'
  })
}

module.exports = Routes;
