/*global angular */

'use strict';

describe('Unit: ArticleService', function() {

  var service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject(function(ArticleService) {
      service = ArticleService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it("should return all the articles", function() {
    service.allArticles();
  });

  it("should filter articles by single category", function() {
    service.filter("");
  });

  it("should filter articles by multiple categories", function() {
    service.filter(["", "", ""]);
  });

});
