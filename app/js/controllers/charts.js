'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function ChartsCtrl($scope, $filter) {
  $scope.myInterval = 10000;
  var translatedChartObjs = data.charts.reduce(function(o, chart) {
    o[chart.id] = {
        id: chart.id,
        type: chart.type,
        title: $filter("lang")(chart.title),
        labels: $filter("lang")(chart.labels),
        series: $filter("lang")(chart.series),
        data: chart.data,
        legend: chart.legend
    };
    return o;
  }, {});

  var slides = data.homeChartsSlider.map(function(view){
    return view.map(chartId => translatedChartObjs[chartId]);
  });

  $scope.slides = slides;
}

controllersModule.controller('ChartsCtrl', ChartsCtrl);
