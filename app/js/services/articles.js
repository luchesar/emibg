'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
//function ArticleService($q, $http) {
function ArticleService($stateParams) {

  var service = {};

  /*service.get = function() {
    var deferred = $q.defer();

    $http.get('apiPath').success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        deferred.reject(err, status);
    });

    return deferred.promise;
  };*/

 /**
  * Returns the articles that have all the categories.
  * param categories - either a string or an array of string.
  * return: An array of the articles matching all the passed categories.
  */
  var filter = function(categories) {
    return _(data.articles)
      .filter(function(article){
        return _(categories).without(article.category).isEmpty();
      })
      .filter(function(article) {
         if($stateParams.lang)
           return article.title[$stateParams.lang];
         else
           return true;
      });
  };

  service.filter = filter

  service.filterPaged = function(categories, page, itemsPerPage, itemsPerRow) {
    return _(filter(categories).toArray())
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .chunk(itemsPerRow || 3).toArray();
  }

  service.filterSize = function(categories) {
    return filter(categories).size();
  }

  service.filterChunked = function(categories, itemsPerRow) {
    return filter(categories)
      .chunk(itemsPerRow || 3).toArray();
  }

  service.allArticles = function() {
    return data.articles;
  };

  service.article = function(id) {
    return _(data.articles).findWhere({ id: id });
  };

  return service;
}

servicesModule.service('ArticleService', ArticleService);

