'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function AdminMenuCtrl($scope, $state, EmiAuth) {
  $scope.checkLoggedIn = function() {
    if (!EmiAuth.isLoggedIn()) $state.go('app.login');
  }

  if (EmiAuth.getUser()) {
    $scope.email = angular.copy(EmiAuth.getUser().email);
  }

  $scope.logout = function() {
    EmiAuth.logout();
    $state.go('app.login');
  }
}

controllersModule.controller('AdminMenuCtrl', AdminMenuCtrl);
