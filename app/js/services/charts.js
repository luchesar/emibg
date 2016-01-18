
'use strict';

var servicesModule = require('./_index.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function ChartsService($stateParams, $filter) {
  var service = {};

  service.translate = function(chart) {
    return {
      id: chart.id,
      type: chart.type,
      title: $filter("lang")(chart.title),
      labels: $filter("lang")(chart.labels),
      series: $filter("lang")(chart.series),
      data: chart.data,
      legend: chart.legend
    };
  };

  return service;
}

servicesModule.service('ChartsService', ChartsService);

