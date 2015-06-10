'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function flatArticle() {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "fragments/flat-article.html"
  };

}

directivesModule.directive('flatArticle', flatArticle);
