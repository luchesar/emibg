'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');
var uuid = require('uuid');

/**
* @ngInject
*/
function AdminChartCtrl($scope, $stateParams, $filter, $rootScope, $state, $http, ChartsService, $sce) {
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
    if (!$scope.chart.itemId) {
      $scope.chart.itemId = uuid.v1();
    }

    var method = $http.post;
    var url = "/api/charts";
    if ($scope.chart.id) {
      method = $http.put;
      url = "/api/charts/" + $scope.chart.id;
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
    $scope.edit = {};
    $scope.edit.data = JSON.stringify(chart.data, null, 2);
    $scope.edit.series = JSON.stringify(chart.series, null, 2);
    $scope.edit.labels = JSON.stringify(chart.labels, null, 2);
    $scope.chart = chart;

    $scope.$watchCollection('edit', function() {
      $scope.chart.data = JSON.parse($scope.edit.data);
      $scope.chart.labels = JSON.parse($scope.edit.labels);
      if ($scope.chart.series) 
        $scope.chart.series = JSON.parse($scope.edit.series);
    });
  };

  if ($stateParams.id) {
    $http.get("/api/charts/" + $stateParams.id)
    .then(response => response.data)
    .then(init)
    .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
  } else {
    init({
      title: {bg:'', en:''},
      type: 'chart-bar',
      data: [[405,40,20],[39,39,22],[20,20,60]],
      series: [{"bg": "Вятър","en": "Wind"},{"bg": "ВЕЦ","en": "Water"},{"bg": "Слънчева","en": "Sun"}],
      labels: [{"bg": "България","en": "Bulgaria"},{"bg": "Сърбия","en": "Serbia"},{"bg": "ЕС","en": "EU"}],
      legend: true
    });
  }
}

controllersModule.controller('AdminChartCtrl', AdminChartCtrl);
