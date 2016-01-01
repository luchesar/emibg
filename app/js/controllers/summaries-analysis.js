'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function SummariesAnalysisCtrl($scope, $stateParams, $state, ArticleService, PagingService) {
  ArticleService.filterSize(['summaries'])
  .then(function(count) {
    $scope.itemsCount = count.count;
    PagingService.init($scope, $stateParams, $state);
    ArticleService.filterPaged(
      ['summaries'],
      $scope.page,
      $scope.itemsPerPage,
      2
    ).then(items => $scope.summariesAnalysis = items);
  });
}

controllersModule.controller('SummariesAnalysisCtrl', SummariesAnalysisCtrl);
