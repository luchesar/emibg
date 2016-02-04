'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function EmiAuth($location, $q) {
  var service = {};
  var tokenKeyName = 'emibgtoken';
  var userKeyName = 'emibguser';
  var storage = window.localStorage;
  service.token = null;
  service.user = null;

  if (storage.getItem(tokenKeyName)) {
    service.token = angular.fromJson(storage.getItem(tokenKeyName));
  }

  if (storage.getItem(userKeyName)) {
    service.user = angular.fromJson(storage.getItem(userKeyName));
  }

  service.login = function(token) {
    service.token = token;
    if (token) storage.setItem(tokenKeyName, angular.toJson(token));
  }

  service.setUser = function(user) {
    service.user = user;
    if (user) storage.setItem(userKeyName, angular.toJson(user));
  }

  service.isLoggedIn = function() {
    return service.token !== undefined && service.token !== null;
  }

  service.addAuthHeader = function(config) {
    if (service.isLoggedIn()) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = service.getAccessToken();
    }
    return config;
  }

  service.logout = function() {
    service.token = null;
    service.user = null;
    storage.removeItem(tokenKeyName);
    storage.removeItem(userKeyName);
  }

  service.getAccessToken = function() {
    return service.token.id;
  }

  service.getUser = function() {
    return service.user;
  }

  service.request = function(config) {
    service.addAuthHeader(config.headers);
    return config;
  };

  service.responseError = function(response) {
    if ($location.path() !== '/bg/login' && response.status === 401) {
      $location.path('/bg/login')
    }
    return response;
  };

  return service;
}

servicesModule.service('EmiAuth', EmiAuth);

