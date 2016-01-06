'use strict'

var controllersModule = require('./_index');

function AllEventsCtrl($scope, $stateParams, $state, EventService, PagingService) {
  $scope.pageCount = "Loading";
  EventService.filterSize()
  .then(function(count) {
    $scope.itemsCount = count.count;
    PagingService.init($scope, $stateParams, $state);
    EventService.filterPaged(
      $scope.page,
      $scope.itemsPerPage,
      2
    ).then(items => $scope.events = items);
 });
}

controllersModule.controller('AllEventsCtrl', AllEventsCtrl);
