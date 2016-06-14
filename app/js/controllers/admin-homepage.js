'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function AdminHomepageCtrl($scope, $rootScope, $state, $http, $sce, $q, EmiAuth, ArticleService, EventService, ChartsService) {
  var missingItemTitle = 'не може да се намери статия или събитие с тази референция';
  var itemsUrl = "/api/homeItemsSliders";
  var chartsUrl = "/api/homeChartsSliders";
  var videosUrl = "/api/homeVideos";

  $scope.alerts = [];
  $scope.previousState = $rootScope.previousState;
  $scope.previousStateParams = $rootScope.previousStateParams;

  $scope.cancel = function() {
    if ($rootScope.previousState) {
      $state.go($scope.previousState, $scope.previousStateParams);
    } else {
      $state.go("app.admin");
    }
  };

  $scope.save = function() {
    $scope.alerts = [];

    var sav = function(url, thing) {
      var method = $http.post;
      var sendUrl = url;
      if (thing.id) {
        method = $http.put;
        sendUrl = url + "/" + thing.id;
      }
      return method(sendUrl, thing, EmiAuth.addAuthHeader({}));
    }

    var promises = $scope.items.map(item => sav(itemsUrl, item))
      .concat($scope.charts.map(chart => sav(chartsUrl, chart)))
      .push(sav(videosUrl, $scope.video));

    $q.all(promises)
    .then(function(response) {
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Конфигурацията на началната страница е записана успешно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише конфигурацията на началната страница в момента. Моля опитайте след малко."});
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  var loadItem = function(itemId) {
    return ArticleService.findByItemId(itemId, function() { return EventService.findByItemId(itemId)});
  }

  $scope.updateItemTitle = function(itemId, index) {
    loadItem(itemId).then(item => { 
      if ( item && item.title) {
        $scope.itemTitles[index] = item.title.bg;
      } else {
        $scope.itemTitles[index] = missingItemTitle;
      }
    });
  }

  $scope.updateChartTitle = function(i, j) {
    ChartsService.findByItemId($scope.charts[i].charts[j])
    .then(chart => {
      if (chart && chart.title) {
        $scope.chartTitles[i][j] = chart.title.bg;
      } else {
        $scope.chartTitles[i][j] = missingItemTitle;
      }
    });
  }

  var defaultServerItesm = [
   {type: "no-type", itemId: ""},
   {type: "no-type", itemId: ""},
   {type: "no-type", itemId: ""}
  ];

  var defaultServerCharts = [
    { charts: ["", "", ""]},
    { charts: ["", "", ""]}
  ];

  var defaultServerVideo = {videoUrl: ""};

  var loadItemTitles = function(serverItems) {
    $q.all(serverItems.map(item => loadItem(item.itemId)))
    .then(function(items) {
      $scope.itemTitles = items.map(item => {
        if (item && item.title)
          return item.title.bg
        else return missingItemTitle;
      });
    });
  }

  var loadChartTitles = function(serverCharts) {
    $q.all(serverCharts.map(charts => $q.all(charts.charts.map(ChartsService.findByItemId))))
    .then(charts => {
      $scope.chartTitles = charts.map(charts => charts.map(chart => {
        if (chart && chart.title) return chart.title.bg;
      }));
    });
  }

  var items = $http.get(itemsUrl + "?filter[limit]=3");
  var charts = $http.get(chartsUrl + "?filter[limit]=2");
  var video = $http.get(videosUrl + "?filter[limit]=1");
  $q.all([items, charts, video])
  .then(function(result) {
    var serverItems = result[0].data;
    if (serverItems.length < 1) serverItems = defaultServerItesm;
    var serverCharts = result[1].data;
    if (serverCharts.length < 1) serverCharts = defaultServerCharts;
    var serverVideo = result[2].data
    if (serverVideo.length < 1) serverVideo = defaultServerVideo;
    else serverVideo = serverVideo[0];
    $scope.items = serverItems;
    $scope.charts = serverCharts;
    $scope.video = serverVideo;
    if ($scope.video.videoUrl)
      $scope.videoUrl = $sce.trustAsResourceUrl($scope.video.videoUrl);

    $scope.$watch('video.videoUrl', function() {
      if ($scope.video.videoUrl)
        $scope.videoUrl = $sce.trustAsResourceUrl($scope.video.videoUrl);
    });

    loadItemTitles(serverItems);
    loadChartTitles(serverCharts);
  })
  .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
}

controllersModule.controller('AdminHomepageCtrl', AdminHomepageCtrl);
