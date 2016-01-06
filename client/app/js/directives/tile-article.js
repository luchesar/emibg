'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function tileArticle() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: "fragments/tile-article.html"
  };
}

directivesModule.directive('tileArticle', tileArticle);
