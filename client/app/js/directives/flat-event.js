'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flatEvent() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "fragments/flat-event.html"
  };

}

directivesModule.directive('flatEvent', flatEvent);
