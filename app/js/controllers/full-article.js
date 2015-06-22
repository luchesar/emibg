'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullArticleCtrl($scope, $sce, $stateParams, ArticleService, $filter) {
  $scope.article = ArticleService.article($stateParams.id);
  $scope.articleHtml = $sce.trustAsHtml($filter('lang')($scope.article.html));
}

controllersModule.controller('FullArticleCtrl', FullArticleCtrl);
