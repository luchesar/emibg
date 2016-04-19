'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

var controllerLogic = function($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling, filtercode) {
  $document.scrollTopAnimated(0, 190);
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $scope.alerts = [];
  ErrorHandling.handle($http.get(
    "/api/events/paged/" +
    ($stateParams.lang ||  "bg") +
    "?p=" + PagingService.pageNumber($stateParams) +
    "&size=" + $scope.itemsPerPage +
    (filtercode ? "&filtercode=" + filtercode : "")
  ))
  .then(function(data) {
    $scope.itemsCount = data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
    $scope.events = _(data.items)
        .chunk(2).toArray();
  })
  .catch(err => {
    $scope.alerts.push({type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err});
    console.log("APP ERROR: " + err);
  });
}

function AllEventsCtrl($scope, $stateParams, $http, $state, PagingService, ErrorHandling) {
  controllerLogic($scope, $stateParams, $http, $state, PagingService, ErrorHandling, "futureevents");
}

function PastEventsCtrl($scope, $stateParams, $http, $state, PagingService, ErrorHandling) {
  controllerLogic($scope, $stateParams, $http, $state, PagingService, ErrorHandling, "pastevents");
}

controllersModule.controller('AllEventsCtrl', AllEventsCtrl);
controllersModule.controller('PastEventsCtrl', PastEventsCtrl);
