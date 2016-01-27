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
      var chart = element.attr('chart') || 'chart';
      if (chart) {
        scope.chart = scope.$eval(chart);
      }
    }
  };

}

directivesModule.directive('chartPanel', chartPanel);
