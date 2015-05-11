'use strict';

/**
 * @ngInject
 */
function Translations($translateProvider) {
  $translateProvider
    .translations('en', {
      EMI: 'EMI',
      HOME: 'Home'
    })
    .translations('bg', {
      EMI: 'Еми',
      HOME: 'Начало'
    });
  $translateProvider.preferredLanguage('bg');
}

module.exports = Translations
