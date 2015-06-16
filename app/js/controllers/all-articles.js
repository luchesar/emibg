'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function AllArticlesCtrl($scope, ArticleService) {
  $scope.testValue = "test value"
  $scope.allArticles = ArticleService.allArticles();
}

controllersModule.controller('AllArticlesCtrl', AllArticlesCtrl);
