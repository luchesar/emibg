'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminChartsCtrl($scope, $stateParams, $http, $state, PagingService, ChartsService) {
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $http.get(
    "/api/charts/paged/" +
    ($stateParams.lang ||  "bg") +
    "?p=" + PagingService.pageNumber($stateParams) +
    "&size=" + PagingService.itemsPerPage
  )
  .then(function(response) {
    $scope.itemsCount = response.data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount);
    $scope.charts = _(response.data.items.map(ChartsService.translate))
        .chunk(3).toArray();
  })
  .catch(function(err) {
    console.log(err);
  });
}

controllersModule.controller('AdminChartsCtrl', AdminChartsCtrl);
