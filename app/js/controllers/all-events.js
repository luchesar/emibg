'use strict'

var controllersModule = require('./_index');

function AllEventsCtrl($scope, EventService) {
  $scope.allEvents = EventService.allEvents();
}

controllersModule.controller('AllEventsCtrl', AllEventsCtrl);
