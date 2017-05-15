'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullEventCtrl($scope, $rootScope, $sce, $stateParams, EventService, $filter, $document, $timeout, $location) {
  $document.scrollTopAnimated(0, 190);

  $scope.alerts = [];
  EventService.event($stateParams.id)
  .then(function(event) {
    $scope.location = $location.absUrl();
    $scope.event = event;
    $scope.eventHtml = $sce.trustAsHtml($filter('lang')($scope.event.html));
    $timeout(function() {
      $rootScope.pageTitle = $filter('lang')(event.title) + ' \u2014 ' + $rootScope.pageTitle;
      $rootScope.$broadcast('emiTitleChangeAttempt');
    }, 80);
  })
  .catch(err => {
    $scope.alerts.push({type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err});
    console.log("APP ERROR: " + err);
  });
}

controllersModule.controller('FullEventCtrl', FullEventCtrl);
