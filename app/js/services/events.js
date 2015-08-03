'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function EventService($q, $http) {

  var service = {};

  service.allEvents = function() {
    console.log("eventi:" + data.events);
    return data.events;
  }

  return service;
}

servicesModule.service('EventService', EventService);

