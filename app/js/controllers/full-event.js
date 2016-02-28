'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullEventCtrl($scope, $rootScope, $sce, $stateParams, EventService, $filter, $document, $timeout) {
  $document.scrollTopAnimated(0, 190);
  EventService.event($stateParams.id)
  .then(function(event) {
    $scope.event = event;
    $scope.eventHtml = $sce.trustAsHtml($filter('lang')($scope.event.html));
    $timeout(function() {
      $rootScope.pageTitle = $filter('lang')(event.title) + ' \u2014 ' + $rootScope.pageTitle;
    }, 20);
  });
}

controllersModule.controller('FullEventCtrl', FullEventCtrl);
