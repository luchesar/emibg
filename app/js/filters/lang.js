'use strict'

var filtersModule = require('./_index');

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
  return function(translation) {
    var current = currentLang($stateParams, $translate);
    var result = translation[current];
    
    return result || translation.bg;
  };
}

filtersModule.filter('lang', LangFilter);
