'use strict';

var servicesModule = require('./_index.js');
var data = require('../data.js');
var _ = require('lazy.js');
var moment = require('moment');

function SearchService($stateParams, $filter) {

  var service = {};
  var lang = $filter('lang');

  var filter = function() {
    var items = data.articles.map(function(art) {
        art.type = 'article';
        return art;
      })
      .concat(data.events.map(function(ev){
        ev.type = 'event';
        return ev;
      }))
      .sort(item => moment(item.date).toDate());
      return items.filter(function(item) {
         if($stateParams.lang)
           return item.title[$stateParams.lang];
         else
           return true;
      });
  };

  service.search = function(searchTerm) {
    return filter().filter(function(item) {
       if (!searchTerm) return true;
       return lang(item.title).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              lang(item.html).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  };

  service.paged = function(searchTerm, page, itemsPerPage, itemsPerRow) {
    return _(service.search(searchTerm))
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .chunk(itemsPerRow || 3).toArray();
  }
  return service;
}

servicesModule.service('SearchService', SearchService);

