'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flatAdminChart() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "admin/flat-chart.html",
    link: function(scope, element, attributes) {
      var chart = element.attr('chart') || 'chart';
      if (chart) {
        scope.chart = scope.$eval(chart);
      }
    }
  };

}

directivesModule.directive('flatAdminChart', flatAdminChart);
