'use strict'

var controllersModule = require('./_index');

function SearchCtrl($scope, $rootScope, $state) {
  $scope.goBack = function() {
    if ($rootScope.previousState) {
      $state.go($rootScope.previousState, $rootScope.previousStateParams);
    }
  };
}

controllersModule.controller('SearchCtrl', SearchCtrl);

