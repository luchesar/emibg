'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');

function SearchService($stateParams) {

  var service = {};

  var searchArticles = function(searchTerm) {
    return _(data.articles).filter(function(article) {
        var title = article.title[$stateParams.lang];
        var html = article.
        article.title.indexOf(searchTrem) > -1 ||
        article.html
    }).map(function(article) {
        article.type = "article";
    });
  };

  var searchEvents = function(searchTerm) {
    return _(data.events).filter(function(event) {
    
    }).map(function(event) {
        event.type = "event";
    });
  };

  service.search = function(searchTerm) {
    return searchArticles(searchTerm)
        .concat(searchEvents(searchTerm));
  }:

  return service;
}

servicesModule.service('SearchService', SearchService);

