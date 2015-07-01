'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
//function ArticleService($q, $http) {
function ArticleService() {

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
  service.filter = function(categories) {
    return [];
  };

  service.allArticles = function() {
    return data.articles;
  };

  service.article = function(id) {
    return _(data.articles).findWhere({ id: id });
  };

  return service;
}

servicesModule.service('ArticleService', ArticleService);

