'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chart($compile) {

  return {
    restrict: 'A',
    compile: function(element, attributes) {
        return function(scope, element, attributes) {
            var template = '<canvas class="chart ' + scope.chart.type + '" data="chart.data" labels="chart.labels" legend="false" series="chart.series"></canvas>';
            element.html(template);
            element.removeAttr('chart');
            var compiledChart = $compile(element);
            compiledChart(scope);
        }
    }
  };

}

directivesModule.directive('chart', chart);
