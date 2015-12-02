'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function HomeCtrl($scope, ArticleService, EventService) {
  var news = ArticleService.filter(['news']).take(6);
  var analysis = ArticleService.filter(['analysis']).take(5);
  var events = EventService.filter().take(5);

  $scope.slideItems = data.homeItemsSlider.map(function(slide){
  	var item = null;
  	if (slide.type === "article") {
  		item = ArticleService.article(slide.id);
  		item.sref = ".article({ id:" + slide.id + " })";
  	} else if (slide.type === "event") {
  		item = EventService.event(slide.id);
  		item.sref = ".event({ id:" + slide.id + " })";
  	}
  	item.type = slide.type;
  	return item;
  });

  $scope.mainNews = news.take(1).toArray();
  $scope.news = news.drop(1).toArray();

  $scope.mainAnalysis = analysis.take(1).toArray();
  $scope.analysis = analysis.drop(1).toArray();

  $scope.mainEvent = events.take(1).toArray();
  $scope.events = events.drop(1).toArray();
}

controllersModule.controller('HomeCtrl', HomeCtrl);
