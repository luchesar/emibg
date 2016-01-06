'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function tileEvent() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "fragments/tile-event.html"
  };
}

directivesModule.directive('tileEvent', tileEvent);
