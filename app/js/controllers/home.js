'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function HomeCtrl($scope, $q, HomeItemsSlider, ArticleService, EventService) {
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
    var promises = slides.map(function(slide) {
      if (slide.type === "article") {
        return ArticleService.article(slide.itemId)
          .then(function(article) {
            article.sref = ".article({ id:'" + slide.itemId + "' })";
            article.type = slide.type;
            return article;
          });
      } else if (slide.type === "event") {
        return EventService.event(slide.itemId)
          .then(function(event) {
            event.sref = ".event({ id:'" + slide.itemId + "' })";
            event.type = slide.type;
            return event;
          });
      }
    });
    $q.all(promises)
    .then(slideItems => $scope.slideItems = slideItems);
  });
}

controllersModule.controller('HomeCtrl', HomeCtrl);
