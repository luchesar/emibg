'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function EmisAnalysisCtrl($scope, $stateParams, $http, $state, PagingService) {
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $http.get(
    "/api/articles/paged/" +
    ($stateParams.lang ||  "bg") +
    "?categories=emis&p=" + PagingService.pageNumber($stateParams) +
    "&size=" + $scope.itemsPerPage
  )
  .then(function(response) {
    $scope.itemsCount = response.data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
    $scope.emisAnalysis = _(response.data.items)
        .chunk(2).toArray();
  })
  .catch(function(err) {
    console.log(err);
  });
}

controllersModule.controller('EmisAnalysisCtrl', EmisAnalysisCtrl);
