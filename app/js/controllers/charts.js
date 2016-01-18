'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function ChartsCtrl($scope, $filter, $http, ChartsService) {
  $scope.myInterval = 10000;

  $http.get("/api/home-pages/sliderCharts")
  .then(function(response) {
    var translatedSlides = response.data.map(function(slide) {
      return slide.map(ChartsService.translate);
    })
    $scope.slides = translatedSlides;
  })
  .catch(err => console.log(err));
}

controllersModule.controller('ChartsCtrl', ChartsCtrl);
