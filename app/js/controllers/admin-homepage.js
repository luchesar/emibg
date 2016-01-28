'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function AdminHomepageCtrl($scope, $rootScope, $state, $http, $sce, $q) {
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
      var sendUrl = "";
      if (thing.id) {
        method = $http.put;
        sendUrl = url + "/" + thing.id;
      }
      return method(sendUrl, thing);
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

  var items = $http.get(itemsUrl + "?filter[limit]=3");
  var charts = $http.get(chartsUrl + "?filter[limit]=2");
  $q.all([items, charts])
  .then(function(result) {
    var serverItems = result[0].data || [
     {type: "", itemId: ""},
     {type: "", itemId: ""},
     {type: "", itemId: ""}
    ];
    var serverCharts = result[1].data || [
      { charts: ["", "", ""]},
      { charts: ["", "", ""]}
    ];
    $scope.items = serverItems;
    $scope.charts = serverCharts;
  })
  .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
}

controllersModule.controller('AdminHomepageCtrl', AdminHomepageCtrl);
