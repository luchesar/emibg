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

  var doLogin = function(token) {
    EmiAuth.login(token);
    $http.get("/api/Users/" + token.userId, EmiAuth.addAuthHeader({}))
    .then(response => EmiAuth.setUser(response.data))
    .finally(function() {
        $state.go('app.admin');})
  }

  $scope.login = function() {
    $scope.alerts = [];
    $http.post('/api/Users/login', {
      email: $scope.email,
      password: $scope.password
    })
    .then(function(response) {
      if (response.status < 0) {
        $scope.alerts.push({type: 'danger', msg: "Не е възможно да се осъществи връзка със сървъра"});
      } else if (response.status == 401 && response.data.error.code == "LOGIN_FAILED") {
        $scope.alerts.push({type: 'danger', msg: "Невалидна комбинация от имейл и парола."});
      } else if (response.status == 200) {
        doLogin(response.data);
      } else {
       $scope.alerts.push({type: 'danger', msg: "Поради възникнала в момента не е възможен логин. Моля опитайте след малко." + response.data.error.message});
      }
    })
    .catch(function(err) {
      if (err.status == 401 && err.data.error.code == "LOGIN_FAILED") {
        $scope.alerts.push({type: 'danger', msg: "Невалидна комбинация от имейл и парола."});
      } else {
        $scope.alerts.push({type: 'danger', msg: "Поради възникнала в момента не е възможен логин. Моля опитайте след малко." + response.data.error.message});
      }
      console.log(JSON.stringify(err));
    });
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

controllersModule.controller('LoginCtrl', LoginCtrl);
