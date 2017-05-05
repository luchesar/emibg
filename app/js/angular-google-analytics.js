'use strict';

/**
 * @ngInject
 */
function AngularGoogleAnalyticsConfig(AnalyticsProvider) {
  console.log("AnalyticsProvider:" + AnalyticsProvider);
  AnalyticsProvider.setAccount("UA-20992779-1");
  AnalyticsProvider.setPageEvent("$stateChangeSuccess");
}
module.exports = AngularGoogleAnalyticsConfig;
