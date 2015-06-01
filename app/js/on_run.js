'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, $stateParams, $translate, $location, AppSettings) {

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;

    if($stateParams.lang !== undefined){
        var otherLang = $stateParams.lang === 'bg' ? 'en' : 'bg';
        $rootScope.activeLang = $stateParams.lang;
        $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' +otherLang);
        $translate.use($stateParams.lang);
    }
  });

}

module.exports = OnRun;
