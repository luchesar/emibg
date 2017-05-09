'use strict';

/**
 * @ngInject
 */
function AngularGoogleAnalyticsConfig(AnalyticsProvider) {
  console.log("AnalyticsProvider:" + AnalyticsProvider);
  AnalyticsProvider.setAccount("UA-20992779-1");
  AnalyticsProvider.ignoreFirstPageLoad(true);
  AnalyticsProvider.setPageEvent("emiTitleChange");
}
module.exports = AngularGoogleAnalyticsConfig;
