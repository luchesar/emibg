'use strict'

var controllersModule = require('./_index');

function SearchCtrl($scope, $stateParams, $rootScope, $state, SearchService, PagingService) {
  $scope.itemsCount = SearchService.search($stateParams.q).length;

  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {q: $stateParams.q, page: $scope.page});
  });

  $scope.items = SearchService.paged(
    $stateParams.q,
    $scope.page,
    $scope.itemsPerPage,
    2
  );
}

controllersModule.controller('SearchCtrl', SearchCtrl);

