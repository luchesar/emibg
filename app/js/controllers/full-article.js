'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullArticleCtrl($scope, $sce, $stateParams, ArticleService, $filter, $document) {
  $document.scrollTopAnimated(0, 190);
  ArticleService.article($stateParams.id)
  .then(function(article) {
    $scope.article = article;
    $scope.articleHtml = $sce.trustAsHtml($filter('lang')($scope.article.html));
  })
  .catch(err => console.log(err));
}

controllersModule.controller('FullArticleCtrl', FullArticleCtrl);
