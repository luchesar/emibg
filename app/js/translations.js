'use strict';

/**
 * @ngInject
 */
function Translations($translateProvider) {
  $translateProvider
    .translations('en', {
      HOME: 'Home',
      ABOUT_US: 'About us',
      CONTACT: 'Countact',
      EN: 'En',
      BG: 'Бг',
      NEWS: 'News',
      ANALYSIS: "Analysis",
      EVENTS: 'Events',
      ENERGOPEDIA: 'Energopedia',
      PARTNERS: 'Partners'
    })
    .translations('bg', {
      HOME: 'Начало',
      ABOUT_US: 'За нас',
      CONTACT: 'Контакти',
      EN: 'En',
      BG: 'Бг',
      NEWS: 'Новини',
      ANALYSIS: 'Анализи',
      EVENTS: 'Събития',
      ENERGOPEDIA: 'Енергопедия',
      PARTNERS: 'Партньори'
    });
  $translateProvider.preferredLanguage('bg');
}

module.exports = Translations
