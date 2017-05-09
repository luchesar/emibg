'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, $stateParams, $translate, $location, $filter, $timeout, AppSettings, Analytics) {

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    console.log("stateChangeSuccess event:" + event);
    $rootScope.previousState = fromState ? fromState.name : undefined;
    $rootScope.previousStateParams = fromParams;

    if($stateParams.lang !== undefined){
        var otherLang = $stateParams.lang === 'bg' ? 'en' : 'bg';
        $rootScope.activeLang = $stateParams.lang;
        $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' +otherLang);
        $translate.use($stateParams.lang);
    }

    $timeout(function() {
      $rootScope.pageTitle = '';
      if (toState.data && toState.data.title ) {
        if (typeof toState.data.title === 'string') {
          $rootScope.pageTitle += $filter("translate")(toState.data.title);
        } else {
          $rootScope.pageTitle += $filter("lang")(toState.data.title);
        }
        $rootScope.pageTitle += ' \u2014 ';
      }
      $rootScope.pageTitle += AppSettings.appTitle;
      $timeout(function() {
        $rootScope.$broadcast('emiTitleChange');
      }, 100);
    });
  });
}

module.exports = OnRun;
