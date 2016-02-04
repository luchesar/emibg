'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullEventCtrl($scope, $sce, $stateParams, EventService, $filter, $document) {
  $document.scrollTopAnimated(0, 190);
  EventService.event($stateParams.id)
  .then(function(event) {
    $scope.event = event;
    $scope.eventHtml = $sce.trustAsHtml($filter('lang')($scope.event.html));
  });
}

controllersModule.controller('FullEventCtrl', FullEventCtrl);
