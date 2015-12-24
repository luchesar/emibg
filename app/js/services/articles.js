'use strict';

var servicesModule = require('./_index.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function ArticleService($stateParams, Articles) {

  var service = {};

  var whereClause = function(categories) {
    var where = { category: {inq: categories}}
    where["title." + $stateParams.lang] = {regexp: "[^$]"};
    return where;
  }

  service.filterPaged = function(categories, page, itemsPerPage, itemsPerRow) {
    return Articles.find({
      filter: {
        where: whereClause(categories),
        order: 'id DESC',
        limit: itemsPerPage,
        skip: (page -1) * itemsPerPage
      }
    }).$promise
      .then( articles => _(articles).chunk(itemsPerRow || 3).toArray());
  }

  service.filter = function(categories, length) {
    return Articles.find({
      filter: {
        where: whereClause(categories),
        limit: length
      }
    }).$promise;
  }

  service.filterSize = function(categories) {
    return Articles
      .count({filter: {where: whereClause(categories)}})
      .$promise;
  }

  service.article = function(id) {
    return Articles.findById(id);
  };

  return service;
}

servicesModule.service('ArticleService', ArticleService);

