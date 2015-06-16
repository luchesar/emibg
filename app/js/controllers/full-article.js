'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullArticleCtrl($scope, $stateParams, ArticleService) {
  $scope.article = ArticleService.article($stateParams.id);
}

controllersModule.controller('FullArticleCtrl', FullArticleCtrl);
