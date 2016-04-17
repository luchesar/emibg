'use strict';

/**
 * @ngInject
 */
function HttpAuthConfig($httpProvider) {
  $httpProvider.interceptors.push('EmiAuth');
  $httpProvider.defaults.cache = true;
}

module.exports = HttpAuthConfig;

