'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');

/**
* @ngInject
*/
function AdminChartCtrl($scope, $stateParams, $filter, $rootScope, $state, $http, ChartsService) {
  $scope.alerts = [];
  $scope.previousState = $rootScope.previousState;
  $scope.previousStateParams = $rootScope.previousStateParams;

  $scope.cancel = function() {
    if ($rootScope.previousState) {
      $state.go($scope.previousState, $scope.previousStateParams);
    } else {
      $state.go("app.admin.charts");
    }
  };

  $scope.save = function() {
    $scope.alerts = [];
    $scope.chart.date = moment().valueOf();

    // Remove the empty props to be able to filter with exists in ES
    nullify($scope.chart.title);

    var method = $http.post;
    var url = "/api/charts";
    if ($scope.chart.id) {
      method = $http.put;
      url = "/api/charts/" + $scope.event.id;
    }
    method(url, $scope.chart)
    .then(function(response) {
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Графиката е записана успещно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише графиката в момента. Моля опитайте след малко."});
    });
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };


  var init = function(chart) {
    $scope.chart = chart;
  };

  if ($stateParams.id) {
    $http.get("/api/charts/" + $stateParams.id)
    .then(response => response.data)
    .then(init)
    .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
  } else {
    init({
      title: {bg:'', en:''},
      type: 'chart-bar'
    });
  }
}

controllersModule.controller('AdminChartCtrl', AdminChartCtrl);
