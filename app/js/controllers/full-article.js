'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullArticleCtrl($scope, $sce, $stateParams, ArticleService) {
  $scope.article = ArticleService.article($stateParams.id);
  $scope.articleHtml = $sce.trustAsHtml($scope.article.html.bg);
}

controllersModule.controller('FullArticleCtrl', FullArticleCtrl);
