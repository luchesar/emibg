'use strict'

var controllersModule = require('./_index');

function SearchCtrl($scope, $rootScope, $state, $SearchService) {
  $scope.searchTerm = "";
  $scope.foundItems = [];

  $scope.goBack = function() {
    if ($rootScope.previousState) {
      $state.go($rootScope.previousState, $rootScope.previousStateParams);
    }
  };

  $scope.onEsc = function($event) {
    $event.preventDefault();
    $scope.goBack();
  }

  $scope.onChange = function($event) {
    console.log("changed ");
  }

  $scope.search = function() {
    $scope.foundItems = $SearchService.search(searchTerm);
  }

  $scope.search();
}

controllersModule.controller('SearchCtrl', SearchCtrl);

