/*
'use strict'

var controllersModule = require('./_index');

function AllTeamsCtrl($scope, TeamService) {
  $scope.allTeams = TeamService.allTeams();
}

controllersModule.controller('AllTeamsCtrl', AllTeamsCtrl);
*/


var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);
