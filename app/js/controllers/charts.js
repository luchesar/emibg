'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function ChartsCtrl($scope, $filter, $http) {
  $http.get("/api/home-pages/sliderCharts")
  .then(function(response) {
    $scope.slides = response.data;
  })
  .catch(err => console.log(err));
}

controllersModule.controller('ChartsCtrl', ChartsCtrl);
