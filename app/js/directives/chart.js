'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chart($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
        var chartObjStr = element.attr('chart') || "chart";
        var chartObj = scope.$eval(chartObjStr);
        var template = '<canvas class="' + chartObjStr + ' ' + chartObj.type + '" data="' + chartObjStr + '.data" labels="' + chartObjStr + '.labels" legend="' + chartObj.legend + '" series="' + chartObjStr + '.series"></canvas>';
        element.html(template);
        element.removeAttr('chart');
        var compiledChart = $compile(element);
        compiledChart(scope);
    }
  };
}

directivesModule.directive('chart', chart);
