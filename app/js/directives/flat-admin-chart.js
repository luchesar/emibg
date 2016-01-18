'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flatAdminChart() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "admin/flat-chart.html"
  };

}

directivesModule.directive('flatAdminChart', flatAdminChart);
