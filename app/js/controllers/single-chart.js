'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function SingleChartCtrl($scope, $stateParams, $http, $filter, $document) {
  $document.scrollTopAnimated(0, 190);
  $http.get("/api/charts/" + $stateParams.id)
  .then(function(response) {
      $scope.chart = response.data;
  })
  .catch(function(err) {
    console.log(err);
  });
}

controllersModule.controller('SingleChartCtrl', SingleChartCtrl);
