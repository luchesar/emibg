'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flatAdminEvent() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "admin/flat-event.html"
  };

}

directivesModule.directive('flatAdminEvent', flatAdminEvent);
