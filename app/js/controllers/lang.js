'use strict';

var controllersModule = require('./_index');

/*function NavigationController($scope, $rootScope, $stateParams, $translate) {
  $scope.$on('$stateChangeSuccess', function rootStateChangeSuccess(event, toState){
    if($stateParams.lang !== undefined){
        var otherLang = $stateParams.lang === 'bg' ? 'en' : 'bg';
        $rootScope.activeLang = $stateParams.lang;
        $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' +otherLang);
        $translate.use($stateParams.lang);
    }
  }
}*/

/**
 * @ngInject
 */
function LangCtrl($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
}

controllersModule.controller('LangCtrl', LangCtrl);
