'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function HomeCtrl($scope, HomeItemsSlider, ArticleService, EventService) {
  ArticleService.filter(['news'], 6).then(function(news) {
    $scope.mainNews = _(news).take(1).toArray();
    $scope.news = _(news).drop(1).toArray();
  });// TODO show the error

  ArticleService.filter(['emis'], 5).then(function(analysis){
    $scope.mainAnalysis = _(analysis).take(1).toArray();
    $scope.analysis = _(analysis).drop(1).toArray();
  });// TODO show the error

  EventService.filter(5).then(function(events) {
    $scope.mainEvent = _(events).take(1).toArray();
    $scope.events = _(events).drop(1).toArray();
  });// TODO show the error

  HomeItemsSlider.find().$promise.then(function(slides) {
    $scope.slideItems = slides.map(function(slide){
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
  });
}

controllersModule.controller('HomeCtrl', HomeCtrl);
