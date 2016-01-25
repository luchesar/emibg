'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');

/**
 * @ngInject
 */
function flatAdminArticle() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "admin/flat-article.html"
  };

}

directivesModule.directive('flatAdminArticle', flatAdminArticle);
