'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function HomeCtrl($scope, $http, $stateParams) {
  $http.get("/api/home-pages/" + $stateParams.lang || "bg")
  .then(function(response) {
    $scope.mainNews = _(response.data.news).take(1).toArray();
    $scope.news = _(response.data.news).drop(1).toArray();

    $scope.mainAnalysis = _(response.data.analysis).take(1).toArray();
    $scope.analysis = _(response.data.analysis).drop(1).toArray();

    $scope.mainEvent = _(response.data.events).take(1).toArray();
    $scope.events = _(response.data.events).drop(1).toArray();

    $scope.slideItems = response.data.slides;
  });
}

controllersModule.controller('HomeCtrl', HomeCtrl);
