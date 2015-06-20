'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

/**
 * @ngInject
 */
function PartnerService($q, $http) {

  var service = {};

  service.allPartners = function() {
    console.log("partniori:" + data.partners);
    return data.partners;
  }

  return service;
}

servicesModule.service('PartnerService', PartnerService);

