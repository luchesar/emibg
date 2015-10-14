'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chart($compile) {

  return {
    restrict: 'E',
    compile: function(element, attributes) {
        var type = attributes.type;
        var template = '<canvas class="chart ' + type + '" data="chart.data" labels="chart.labels" legend="false" series="chart.series"></canvas>';
        element.html(template);
        var compiledChart = $compile(element.find('.chart'));
        return function(scope, element, attributes) {
            compiledChart(scope);
        }
    }
  };

}

directivesModule.directive('chart', chart);
