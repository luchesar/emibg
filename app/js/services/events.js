'use strict';

var servicesModule = require('./_index.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
//function EventService($q, $http) {
function EventService($stateParams, $q, $http, Events, ErrorHandling) {

  var service = {};

  var whereClause = function() {
    var where = {}
    where["title." + $stateParams.lang] = {regexp: "[^$]"};
    return where;
  }

  service.filterPaged = function(page, itemsPerPage, itemsPerRow) {
    return Events.find({
      filter: {
        where: whereClause(),
        order: 'id DESC',
        limit: itemsPerPage,
        skip: (page -1) * itemsPerPage
      }
    }).$promise
      .then(items => 
          _(items).chunk(itemsPerRow || 3).toArray()
      );
  }

  service.filter = function(length) {
    return Events.find({
      filter: { where: whereClause(), limit: length }
    }).$promise;
  }

  service.filterSize = function() {
    var query = "/api/events/count?where[title." + $stateParams.lang + "][regexp]=[^$]"
    return $http.get(query).then(response => response.data);
  }

  service.event = function(id) {
    return ErrorHandling.handle($http.get("/api/events/" + id));
  };

  service.findByItemId = function(itemId, orElse) {
    return Events.findOne({ filter: { where: {"itemId":itemId}}})
    .$promise
    .then(function(event) {
      if (event && event.itemId === itemId) {
        return event;
      } else if (orElse) {
        return orElse();
      }
    });
  }

  return service;
}

servicesModule.service('EventService', EventService);

