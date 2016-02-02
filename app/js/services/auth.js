'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function EmiAuth($location, $q) {
  var service = {};
  var cookieName = 'emibguser';
  service.user = null;//$cookies.getObject(cookieName);

  service.login = function(usr) {
    service.user = usr;
    //$cookies.setObject(cookieName, service.user);
  }

  service.isLoggedIn = function() {
    return service.user !== undefined && service.user !== null;
  }

  service.logout = function() {
    service.user = null;
    //$cookies.remove(cookieName);
  }

  service.getAccessToken = function() {
    return service.user.id;
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

