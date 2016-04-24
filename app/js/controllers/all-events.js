'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
var controllerLogic = function($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling, filtercode, order) {
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
    "&orderby=start%20" + order +
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

function AllEventsCtrl($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling) {
  controllerLogic($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling, "futureevents", "ASC");
}

function PastEventsCtrl($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling) {
  controllerLogic($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling, "pastevents", "DESC");
}

controllersModule.controller('AllEventsCtrl', AllEventsCtrl);
controllersModule.controller('PastEventsCtrl', PastEventsCtrl);
