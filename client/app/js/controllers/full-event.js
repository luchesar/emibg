'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullEventCtrl($scope, $sce, $stateParams, EventService, $filter) {
  EventService.event($stateParams.id)
  .then(function(event) {
    $scope.event = event;
    $scope.eventHtml = $sce.trustAsHtml($filter('lang')($scope.event.html));
  });
}

controllersModule.controller('FullEventCtrl', FullEventCtrl);
