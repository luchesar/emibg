'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function SingleChartCtrl($scope, $stateParams, $filter) {
  var chart = _(data.charts).find(chart => chart.id === $stateParams.id);
  $scope.chart = {
        type: chart.type,
        title: $filter("lang")(chart.title),
        labels: $filter("lang")(chart.labels),
        series: $filter("lang")(chart.series),
        data: chart.data,
        legend: chart.legend
  };
}

controllersModule.controller('SingleChartCtrl', SingleChartCtrl);
