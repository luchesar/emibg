'use strict';

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider
    .when('/', '/bg/home')
    .when('/bg', '/bg/home')
    .when('/en', '/en/home')
    .otherwise('/bg/home');

  $stateProvider
  .state('app', {
    url: '/{lang:(?:bg|en)}',
    abstract: true,
    views: {
      'banner': {templateUrl: 'fragments/banner.html'},
      'right-column': {templateUrl: 'fragments/right-column.html'},
      'footer': {templateUrl: 'fragments/footer.html'}
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'banner@': {template: ''},
      'right-column@': {template: ''},
      'footer@': {template: ''},
      'content@': { templateUrl: 'login.html' }
    },
    data: { title: "LOGIN"}
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
    templateUrl: 'search.html',
    data: { title: "SEARCH"}
  })
  .state('app.search.result.event', {
    url: '/event/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-event.html' }},
    data: { title: "EVENTS"}
  })
  .state('app.search.result.article', {
    url: '/article/{id:string}',
    views: { 'content@': { templateUrl: 'fragments/full-article.html' }},
    data: { title: "ARTICLES"}
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
    templateUrl: 'fragments/home.html',
    data: { title: "HOME"}
  })
  .state('app.menu.home.event', {
    url: '/event/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-event.html' }},
    data: { title: "EVENTS"}
  })
  .state('app.menu.home.article', {
    url: '/article/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-article.html' }},
    data: { title: "ARTICLES"}
  })
  .state('app.menu.news', {
    url: '/news/{page:int}',
    templateUrl: 'fragments/news.html',
    data: { title: "NEWS"}
  })
  .state('app.menu.news.article', {
    url: '/article/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-article.html' }}
  })
  .state('app.menu.analysis', {
    url: '/analysis',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.menu.analysis.emis', {
    url: '/emis/{page:int}',
    templateUrl: 'fragments/emis-analysis.html',
    data: { title: "EMIS_ANALYSIS"}
  })
  .state('app.menu.analysis.emis.article', {
    url: '/article/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-article.html' }}
  })
  .state('app.menu.analysis.summaries', {
url: '/summaries/{page:int}',
    templateUrl: 'fragments/summaries-analysis.html',
    data: { title: "SUMMARIES"}
  })
  .state('app.menu.analysis.summaries.article', {
    url: '/article/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-article.html' }}
  })
  .state('app.menu.events', {
    url: '/events/{page:int}',
    templateUrl: 'fragments/events.html',
    data: { title: "EVENTS"}
  })
  .state('app.menu.events.event', {
    url: '/event/{id:string}',
    views: {'content@': { templateUrl: 'fragments/full-event.html' }}
  })
  .state('app.menu.energopedia', {
    url: '/energopedia',
    templateUrl: 'fragments/energopedia.html',
    data: { title: "ENERGOPEDIA"}
  })
  .state('app.menu.partners', {
    url: '/partners',
    templateUrl: 'fragments/partners.html',
    data: { title: "PARTNERS"}
  })
  .state('app.menu.about', {
    url: '/about',
    abstract: true,
    template: '<ui-view/>'
  })
  .state('app.menu.about.mission', {
    url: '/mission',
    templateUrl: 'fragments/about_mission.html',
    data: { title: "MISSION"}
  })
  .state('app.menu.about.team', {
    url: '/team',
    templateUrl: 'fragments/about_team.html',
    data: { title: "TEAM"}
  })
  .state('app.menu.about.contact', {
    url: '/contact',
    templateUrl: 'fragments/about_contact.html',
    data: { title: "CONTACT"}
  })
  .state('app.menu.article', {
    url: '/article/{id:string}',
    templateUrl: 'fragments/full-article.html',
    data: { title: "ARTICLES"}
  })
  .state('app.menu.chart', {
    url: '/chart/{id:string}',
    templateUrl: 'fragments/single-chart.html',
    data: { title: "EVENTS"}
  })

  // Admin states
  .state('app.admin', {
    url: '/admin',
    views: {
      'menu@': { templateUrl: 'admin/menu.html' },
      'banner@': {template: ''},
      'right-column@': {template: ''},
      'footer@': {template: ''},
      'content@': { template: '<ui-view/>' }
    }
  })
  .state('app.admin.articles', {
    url: '/articles/{page:int}?published&showCategories',
    templateUrl: 'admin/articles.html',
    data: { title: "ARTICLES"}
  })
  .state('app.admin.events', {
    url: '/events/{page:int}?published',
    templateUrl: 'admin/events.html',
    data: { title: "EVENTS"}
  })
  .state('app.admin.charts', {
    url: '/charts/{page:int}',
    templateUrl: 'admin/charts.html',
    data: { title: "CHARTS"}
  })
  .state('app.admin.article', {
    url: '/article/{id:string}',
    templateUrl: 'admin/article.html',
    data: { title: "ARTICLES"}
  })
  .state('app.admin.newarticle', {
    url: '/newarticle',
    templateUrl: 'admin/article.html',
    data: { title: "ARTICLES"}
  })
  .state('app.admin.event', {
    url: '/event/{id:string}',
    templateUrl: 'admin/event.html',
    data: { title: "EVENTS"}
  })
  .state('app.admin.newevent', {
    url: '/newevent',
    templateUrl: 'admin/event.html',
    data: { title: "EVENTS"}
  })
  .state('app.admin.chart', {
    url: '/chart/{id:string}',
    templateUrl: 'admin/chart.html',
    data: { title: "CHARTS"}
  })
  .state('app.admin.newchart', {
    url: '/newchart/{type:string}',
    templateUrl: 'admin/chart.html',
    data: { title: "CHARTS"}
  })
  .state('app.admin.homepage', {
    url: '/homepage',
    templateUrl: 'admin/homepage.html',
    data: { title: "HOME"}
  })
  ;
}

module.exports = Routes;
