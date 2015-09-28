'use strict'

var filtersModule = require('./_index');

/**
* @ngInject
*/

function HtmlToPlainTextFilter() {
  return function(text) {
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
}

filtersModule.filter('htmlToPlainText', HtmlToPlainTextFilter);
