'use strict';

var servicesModule = require('./_index.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function ArticleService($stateParams, $q, $http, Articles, ErrorHandling) {

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
    var query = "/api/articles/count?where[title." + $stateParams.lang + "][regexp]=[^$]"
    for (var i = 0; i < categories.length; i++) {
      query = query + "&where[category][inq][" + i + "]=" + categories[i];
    }
    return $http.get(query).then(response => response.data);
  }

  service.article = function(id) {
    return ErrorHandling.handle($http.get("/api/articles/" + id));
  };

  service.findByItemId = function(itemId, orElse) {
    return Articles.findOne({filter: { where: {"itemId":itemId}}})
    .$promise
    .then(function(article) {
      if (article && article.itemId === itemId) {
        return article;
      } else if (orElse) {
        return orElse();
      }
    });
  }

  return service;
}

servicesModule.service('ArticleService', ArticleService);

