'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function EmiAuth($location, $q) {
  var service = {};
  var cookieName = 'emibguser';
  service.token = null;//$cookies.getObject(cookieName);
  service.user = null;//$cookies.getObject(cookieName);

  service.login = function(token, user) {
    service.token = token;
    service.user = user;
    //$cookies.setObject(cookieName, service.user);
  }

  service.isLoggedIn = function() {
    return service.token !== undefined && service.token !== null;
  }

  service.logout = function() {
    service.token = null;
    service.user = null;
    //$cookies.remove(cookieName);
  }

  service.getAccessToken = function() {
    return service.token.id;
  }

  service.getUser = function() {
    return service.user;
  }

  service.request = function(config) {
    if (service.isLoggedIn()) {
      config.headers['Authorization'] = service.getAccessToken();
    }
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

