'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chart($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
        var template = '<canvas class="chart ' + scope.chart.type + '" data="chart.data" labels="chart.labels" legend="' +scope.chart.legend + '" series="chart.series"></canvas>';
        element.html(template);
        element.removeAttr('chart');
        var compiledChart = $compile(element);
        compiledChart(scope);
    }
  };
}

directivesModule.directive('chart', chart);
