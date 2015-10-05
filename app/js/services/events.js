'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
//function EventService($q, $http) {
function EventService($stateParams) {

  var service = {};

  var filter = function() {
    return _(data.events)
      .filter(function(event) {
         if($stateParams.lang)
           return event.title[$stateParams.lang];
         else
           return true;
      });
  };

  service.filter = filter;

  service.paged = function(page, itemsPerPage, itemsPerRow) {
    return _(filter().toArray())
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .chunk(itemsPerRow || 3).toArray();
  }

  service.eventsSize = function() {
    return filter().size();
  }

  service.event = function(id) {
    return _(data.events).findWhere({ id: id });
  };

  return service;
}

servicesModule.service('EventService', EventService);

