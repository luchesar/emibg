'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function HomeCtrl($scope, ArticleService, EventService, $stateParams) {
  var filterArticle = function(categories) {
      return ArticleService.filter(categories)
        .filter(function(article) {
           if($stateParams.lang)
             return article.title[$stateParams.lang];
           else
             return true;
        });
  };

  var news = filterArticle(['news']).take(6);
  var analysis = filterArticle(['analysis']).take(5);
  var events =_( EventService.allEvents()).take(5);

  $scope.mainNews = news.take(1).toArray();
  $scope.news = news.drop(1).toArray();

  $scope.mainAnalysis = analysis.take(1).toArray();
  $scope.analysis = analysis.drop(1).toArray();

  $scope.mainEvent = events.take(1).toArray();
  $scope.events = events.drop(1).toArray();

}

controllersModule.controller('HomeCtrl', HomeCtrl);
