'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullArticleCtrl($scope, $rootScope, $sce, $stateParams, ArticleService, $filter, $document, $timeout) {
  $document.scrollTopAnimated(0, 190);
  ArticleService.article($stateParams.id)
  .then(function(article) {
    $scope.article = article;
    $scope.articleHtml = $sce.trustAsHtml($filter('lang')($scope.article.html));
    $timeout(function(){
      $rootScope.pageTitle = $filter('lang')(article.title) + ' \u2014 ' + $rootScope.pageTitle;
    }, 20);
  })
  .catch(err => console.log(err));
}

controllersModule.controller('FullArticleCtrl', FullArticleCtrl);
