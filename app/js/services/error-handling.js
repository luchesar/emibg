'use strict';

var servicesModule = require('./_index.js');

function ErrorHandling($q) {
  var service = {};

  service.handle = function(responsePromise) {
    return responsePromise.then(
      function(response) {
        if (response.status < 0) {
          return $q.reject("Не може да се достъпи сървъра.");
        } else if (response.status >= 400) {
          return $q.reject(response.data.error.message);
        } else {
          return response.data;
        }
      },
      function(err) {
        return $q.reject(err.data.error.message);
      }
    );
  }

  return service;
}

servicesModule.service('ErrorHandling', ErrorHandling);
