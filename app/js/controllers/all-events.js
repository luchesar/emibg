'use strict'

var controllersModule = require('./_index');

function AllEventsCtrl($scope, $stateParams, $state, EventService, PagingService) {
  $scope.itemsCount = EventService.eventsSize();

  PagingService.init($scope, $stateParams, $state);

  $scope.events = EventService.paged(
    $scope.page,
    $scope.itemsPerPage,
    2
  );
}

controllersModule.controller('AllEventsCtrl', AllEventsCtrl);
