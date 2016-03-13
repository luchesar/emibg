'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function AdminHomepageCtrl($scope, $rootScope, $state, $http, $sce, $q, EmiAuth, ArticleService, EventService, ChartsService) {
  var itemsUrl = "/api/homeItemsSliders";
  var chartsUrl = "/api/homeChartsSliders";

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
      .concat($scope.charts.map(chart => sav(chartsUrl, chart)));

    $q.all(promises)
    .then(function(response) {
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Конфигурацията на началната страница е записана успещно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише конфигурацията на началната страница в момента. Моля опитайте след малко."});
    });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  var loadItem = function(chartItem) {
    return ArticleService.findByItemId(chartItem.itemId, function() { return EventService.findByItemId(chartItem.itemId)});
  }

  var items = $http.get(itemsUrl + "?filter[limit]=3");
  var charts = $http.get(chartsUrl + "?filter[limit]=2");
  $q.all([items, charts])
  .then(function(result) {
    var serverItems = result[0].data;
    if (serverItems.length < 1) {
      serverItems =  [
       {type: "no-type", itemId: ""},
       {type: "no-type", itemId: ""},
       {type: "no-type", itemId: ""}
      ];
    }
    var serverCharts = result[1].data;
   if (serverCharts.length < 1) {
     serverCharts =  [
        { charts: ["", "", ""]},
        { charts: ["", "", ""]}
      ];
    }
    $scope.items = serverItems;
    $scope.charts = serverCharts;

    $q.all(serverItems.map(loadItem))
    .then(function(items) {
      $scope.itemTitles = items.map(item => {
        if (item && item.title) return item.title.bg
      });
    });

    $q.all(serverCharts.map(charts => $q.all(charts.charts.map(ChartsService.findByItemId))))
    .then(charts => {
      $scope.chartTitles = charts.map(charts => charts.map(chart => {
        if (chart && chart.title) return chart.title.bg;
      }));
      console.log("chart titles;"+ $scope.chartTitles );
    });
  })
  .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
}

controllersModule.controller('AdminHomepageCtrl', AdminHomepageCtrl);
