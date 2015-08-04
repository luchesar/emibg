'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AllArticlesCtrl($scope, ArticleService, $stateParams) {
  $scope.allArticles = ArticleService.allArticles();

  $scope.filter = function(categories, rowSize) {
      return ArticleService.filter(categories)
        .filter(function(article) {
           if($stateParams.lang)
             return article.title[$stateParams.lang];
           else
             return true;
        })
        .chunk(rowSize || 3).toArray();
  }

  $scope.news = $scope.filter(['news'], 2)

  $scope.emisAnalysis = $scope.filter(['analysis', 'emis'], 2)

  $scope.summariesAnalysis = $scope.filter(['analysis', 'summaries'], 2)
  


}

controllersModule.controller('AllArticlesCtrl', AllArticlesCtrl);
