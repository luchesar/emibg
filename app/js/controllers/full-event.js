'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullEventCtrl($scope, $sce, $stateParams, EventService, $filter) {
  $scope.event = EventService.event($stateParams.id);
  $scope.eventHtml = $sce.trustAsHtml($filter('lang')($scope.event.html));
}

controllersModule.controller('FullEventCtrl', FullEventCtrl);
