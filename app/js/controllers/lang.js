'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function LangCtrl($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
}

controllersModule.controller('LangCtrl', LangCtrl);
