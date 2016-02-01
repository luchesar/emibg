'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chart($compile, ChartsService) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      var chartObjStr = element.attr('chart') || "chart";
      var chartObj = scope.$eval(chartObjStr);

      var listener = function() {
        var chartObj = scope.$eval(chartObjStr);
        if (chartObj) {
          var translated = chartObjStr + 'translated';
          scope[translated] = ChartsService.translate(chartObj);
          var template = '<canvas class="' + chartObjStr + ' ' + chartObj.type + '" data="' + chartObjStr + '.data" labels="' + translated + '.labels" legend="' + chartObj.legend + '" series="' + translated + '.series"></canvas>';
          element.html(template);
          element.removeAttr('chart');
          var compiledChart = $compile(element);
          compiledChart(scope);
        }
      };
      //if (chartObj) scope.$watchCollection(chartObj, listener)
      //else 
        scope.$watchCollection(chartObjStr, listener);
    }
  };
}

directivesModule.directive('chart', chart);
