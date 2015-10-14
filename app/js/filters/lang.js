'use strict'

var filtersModule = require('./_index');
var _ = require('lazy.js');

var currentLang = function(stateParams, translate) {
    if (stateParams.lang !== undefined) {
        return stateParams.lang;
    } else {
        return translate.proposedLanguage();
    }
}

/**
* @ngInject
*/
function LangFilter($stateParams, $translate) {
  var translateObject = function(instance, lang) {
    return instance[lang] || instance.bg;
  };

  var translateArray = function(array, lang) {
    return  _(array).map(function(instance) { 
        return translateObject(instance, lang);
    }).toArray();
  }

  return function(translation) {
    var lang = currentLang($stateParams, $translate);

    if (translation && translation.constructor === String)
        return translation;
    else if (translation && translation.constructor === Array)
        return translateArray(translation, lang);
    else if (translation)
        return translateObject(translation, lang);
    else return "";
  };
}

filtersModule.filter('lang', LangFilter);
