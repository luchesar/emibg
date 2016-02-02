'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function LoginCtrl($scope, $stateParams, $state, $http, EmiAuth) {
  $scope.alerts = [];

  $scope.init = function() {
    $scope.email = '';
    $scope.password = '';
  }

  $scope.init();

  $scope.login = function() {
    $scope.alerts = [];
    $http.post('/api/Users/login', {
      email: $scope.email,
      password: $scope.password
    })
    .then(function(response) {
      if (response.status == 401 && response.data.error.code == "LOGIN_FAILED") {
        $scope.alerts.push({type: 'danger', msg: "Невалидна комбинация от имейл и парола."});
      } else if (response.status == 200) {
        EmiAuth.login(response.data);
        $state.go('app.admin');
      } else {
       $scope.alerts.push({type: 'danger', msg: "Поради възникнала в момента не е възможен логин. Моля опитайте след малко."});
      }
    })
    .catch(function(err) {
      if (err.status == 401 && err.data.error.code == "LOGIN_FAILED") {
        $scope.alerts.push({type: 'danger', msg: "Невалидна комбинация от имейл и парола."});
      } else {
        $scope.alerts.push({type: 'danger', msg: "Поради възникнала в момента не е възможен логин. Моля опитайте след малко."});
      }
      console.log(JSON.stringify(err));
    });
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

controllersModule.controller('LoginCtrl', LoginCtrl);
