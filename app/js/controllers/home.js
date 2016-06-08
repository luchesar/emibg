'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function HomeCtrl($scope, $http, $stateParams, ErrorHandling) {
  $scope.alerts = [];
  $scope.loaded = false;
  ErrorHandling.handle($http.get("/api/home-pages/" + ($stateParams.lang || "bg")))
  .then(function(data) {
    $scope.loaded = true;
    $scope.mainNews = _(data.news).take(1).toArray();
    $scope.news = _(data.news).drop(1).toArray();

    $scope.mainAnalysis = _(data.analysis).take(1).toArray();
    $scope.analysis = _(data.analysis).drop(1).toArray();

    $scope.mainEvent = _(data.events).take(1).toArray();
    $scope.events = _(data.events).drop(1).toArray();

    $scope.slideItems = data.slides;
    $scope.sliderInterval = 10000;
  })
  .catch(err => {
    $scope.loaded = true;
    $scope.alerts.push({type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err});
    console.log("APP ERROR: " + err);
  });
}

controllersModule.controller('HomeCtrl', HomeCtrl);
