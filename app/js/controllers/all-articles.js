'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AllArticlesCtrl($scope, ArticleService) {
  $scope.news = ArticleService
    .filterChunked(['news'], 2);

  $scope.emisAnalysis = ArticleService
    .filterChunked(['analysis', 'emis'], 2);

  $scope.summariesAnalysis = ArticleService
    .filterChunked(['analysis', 'summaries'], 2);
}

controllersModule.controller('AllArticlesCtrl', AllArticlesCtrl);
