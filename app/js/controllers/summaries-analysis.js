'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function SummariesAnalysisCtrl($scope, $stateParams, $state, ArticleService, PagingService) {
  $scope.itemsCount = ArticleService.filterSize(['analysis', 'summaries']);
  PagingService.init($scope, $stateParams, $state);
  $scope.summariesAnalysis = ArticleService.filterPaged(
    ['analysis', 'summaries'],
    $scope.page,
    $scope.itemsPerPage,
    2
  );
}

controllersModule.controller('SummariesAnalysisCtrl', SummariesAnalysisCtrl);
