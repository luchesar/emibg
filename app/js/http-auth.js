'use strict';

/**
 * @ngInject
 */
function HttpAuthConfig($httpProvider) {
  $httpProvider.interceptors.push('EmiAuth');
}

module.exports = HttpAuthConfig;

