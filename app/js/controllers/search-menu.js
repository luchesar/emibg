'use strict'

var controllersModule = require('./_index');

function SearchMenuCtrl($scope, $stateParams, $rootScope, $state, SearchService, PagingService) {
  $scope.searchTerm = "";
  $scope.foundItems = [];
  $scope.previousState = $rootScope.previousState;
  $scope.previousStateParams = $rootScope.previousStateParams;

  $scope.goBack = function() {
    if ($rootScope.previousState) {
      $state.go($scope.previousState, $scope.previousStateParams);
    } else {
      $state.go("app.menu.home");
    }
  };

  $scope.onEsc = function($event) {
    $event.preventDefault();
    $scope.goBack();
  };

  $scope.onChange = function($event) {
//      $state.go($rootScope.previousState, $rootScope.previousStateParams);
    console.log("changed");
  };
}

controllersModule.controller('SearchMenuCtrl', SearchMenuCtrl);

