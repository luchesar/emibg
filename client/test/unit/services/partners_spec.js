/*global angular */

'use strict';

describe('Unit: PartnerService', function() {

  var service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject(function(PartnerService) {
      service = PartnerService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it("should return all the partners", function() {
    service.allPartners();
  });

});
