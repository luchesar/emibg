'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');

/**
 * @ngInject
 */
function ArticleService($q, $http) {

  var service = {};

  service.get = function() {
    var deferred = $q.defer();

    $http.get('apiPath').success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  service.allArticles = function() {
    return data.articles;
  }

  return service;

}

servicesModule.service('ArticleService', ArticleService);
