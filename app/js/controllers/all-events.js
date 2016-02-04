'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AllEventsCtrl($scope, $stateParams, $http, $state, PagingService) {
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $http.get(
    "/api/events/paged/" +
    ($stateParams.lang ||  "bg") +
    "?p=" + PagingService.pageNumber($stateParams) +
    "&size=" + $scope.itemsPerPage
  )
  .then(function(response) {
    $scope.itemsCount = response.data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
    $scope.events = _(response.data.items)
        .chunk(2).toArray();
  })
  .catch(function(err) {
    console.log(err);
  });
}

controllersModule.controller('AllEventsCtrl', AllEventsCtrl);
