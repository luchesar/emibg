'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function AllArticlesCtrl($scope, ArticleService) {
  $scope.allArticles = ArticleService.allArticles();

  $scope.filter = function(categories) { return ArticleService.filter(categories);};
}

controllersModule.controller('AllArticlesCtrl', AllArticlesCtrl);
