'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function TeamService($q, $http) {

  var service = {};

  service.allTeams = function() {
    console.log("team:" + data.teams);
    return data.teams;
  }

  return service;
}

servicesModule.service('TeamService', TeamService);

