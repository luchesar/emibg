'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function chartPanel() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "fragments/chart-panel.html"
  };

}

directivesModule.directive('chartPanel', chartPanel);
