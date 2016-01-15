'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function ChartsCtrl($scope, $filter, $http) {
  $scope.myInterval = 10000;

  $http.get("/api/home-pages/sliderCharts")
  .then(function(response) {
    var translatedSlides = response.data.map(function(slide) {
      return slide.map(function(chart) {
        return {
          id: chart.id,
          type: chart.type,
          title: $filter("lang")(chart.title),
          labels: $filter("lang")(chart.labels),
          series: $filter("lang")(chart.series),
          data: chart.data,
          legend: chart.legend
        };
      })
    })
    $scope.slides = translatedSlides;
  })
  .catch(err => console.log(err));
}

controllersModule.controller('ChartsCtrl', ChartsCtrl);
