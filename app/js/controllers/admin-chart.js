'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');
var uuid = require('uuid');

/**
* @ngInject
*/
function AdminChartCtrl($scope, $stateParams, $filter, $rootScope, $state, $http, ChartsService, $sce, $timeout) {
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

  $scope.colDefs = [{field: "column1"}, {field: "column2"}];
  $scope.gridOptions = {
    headerTemplate: '<div class="ui-grid-top-panel" style="text-align: center">Моля въведете данни за диаграмата</div>',
    enableCellEditOnFocus: true,
    columnDefs: $scope.colDefs
  };

  var toGridDataSeries = function(chartObj) {
    var labels = chartObj.labels;
    var data = chartObj.data;
    var series = chartObj.series;
    var line1 = ["", ""].concat(labels).reduce(
      (obj, label, index) => {
        obj['column' + index] = (label === "" ? "" : label.bg)
        return obj
      }, {}
    );
    var line2 = ["", ""].concat(labels).reduce(
      (obj, label, index) => {
        obj['column' + index] = (label === "" ? "" : label.en)
        return obj;
      }, {}
    );
    var gridData = [line1, line2];
    series.forEach((element, index) => {
      var row = {"column0": element.bg, "column1": element.en};
      data[index].forEach((d,i) => row["column" + (2 + i)] = d);
      gridData.push(row);
    });

    var cellClass = function(grid, row, col, rowRenderIndex, colRenderIndex) {
      if (colRenderIndex == 0 || colRenderIndex == 1) {
        if (rowRenderIndex == 0 || rowRenderIndex == 1) {
          return 'cell-disabled'
        } else return 'cell-series';
      }
      if (rowRenderIndex == 0 || rowRenderIndex == 1) {
        return 'cell-labels';
      }
      return 'cell-data';
    };
    
    var colDefs = Object.keys(gridData[0]).map( columnName => {
      return {field: columnName, cellClass: cellClass};
    });
    $scope.colDefs.splice(0, $scope.colDefs.length);
    colDefs.forEach(col => 
        $scope.colDefs.push(col));
    $scope.gridOptions.data = gridData;
  };

  var objectToArray = function(p) {
    var result = [];
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        result.push(p[key]);
      }
    }
  };

  var fromGridDataSeries = function(gridData) {
    var labelsBg = objectToArray(gridData[0]).slice(2);
    var labelsEn = objectToArray(gridData[0]).slice(2);

    var labels = labelsBg.map((l,i) => ({bg: l, en: labelsEn[i]}));
    var data = gridData.filter((o,i) => i > 1).map(objectToArray).map(array => array.slise(2));
    var series = gridData.filter((o,i) => i > 1).map(o => ({bg: o.column0, en: o.column1}));
    
    return {labels: labels, ata: data, series: series};
  }

  var init = function(chart) {
    $scope.edit = {};
    $scope.edit.data = JSON.stringify(chart.data, null, 2);
    $scope.edit.series = JSON.stringify(chart.series, null, 2);
    $scope.edit.labels = JSON.stringify(chart.labels, null, 2);
    $scope.chart = chart;

    toGridDataSeries(chart);
    /*$scope.colDef = [
      { name: 'column0', enableCellEdit: false, width: '10%' },
      { name: 'column1', displayName: 'Name (editable)', width: '20%' },
      { name: 'column2', displayName: 'Age' , type: 'number', width: '10%' }
    ]*/
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
