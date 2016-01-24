'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chartPanel($compile) {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "fragments/chart-panel.html",
    link: function(scope, element, attributes) {
      var chart = element.attr('chart');
      if (chart) {
        scope.chart = scope.$eval(chart);
      }
      /*scope.$watch("chart", function() {
        var compiledChart = $compile(element);
        compiledChart(scope);
      });*/
    }
  };

}

directivesModule.directive('chartPanel', chartPanel);
