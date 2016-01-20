'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminEventsCtrl($scope, $stateParams, $http, $state, PagingService) {
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $http.get(
    "/api/events/paged/" +
    ($stateParams.lang ||  "bg") +
    "?p=" + PagingService.pageNumber($stateParams) +
    "&size=" + PagingService.itemsPerPage +
    "&published=both"
  )
  .then(function(response) {
    $scope.itemsCount = response.data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount);
    $scope.events = response.data.items;
  })
  .catch(function(err) {
    console.log(err);
  });
}

controllersModule.controller('AdminEventsCtrl', AdminEventsCtrl);
