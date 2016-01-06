'use strict'

var controllersModule = require('./_index');

function AllTeamsCtrl($scope, TeamService) {
  $scope.allTeams = TeamService.allTeams();
}

controllersModule.controller('AllTeamsCtrl', AllTeamsCtrl);

