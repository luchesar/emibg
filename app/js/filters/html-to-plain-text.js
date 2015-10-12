'use strict'

var filtersModule = require('./_index');

/**
* @ngInject
*/

function HtmlToPlainTextFilter() {
  var replaceHtmlEntities = (function() {
  var translate_re = /&(nbsp|amp|quot|lt|gt|bdquo|ldquo);/g;
  var translate = {
    "nbsp": " ",
    "amp" : "&",
    "quot": "\"",
    "lt"  : "<",
    "gt"  : ">",
    "bdquo": "„",
    "ldquo": "“"
  };
  return function(s) {
      return ( s.replace(translate_re, function(match, entity) {
        return translate[entity];
      }) );
    }
  })();

  return function(text) {
    return  text ? replaceHtmlEntities(String(text).replace(/<[^>]+>/gm, '')) : '';
  };
}

filtersModule.filter('htmlToPlainText', HtmlToPlainTextFilter);
