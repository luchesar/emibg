'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function EmisAnalysisCtrl($scope, $stateParams, $state, ArticleService, PagingService) {
  $scope.itemsCount = ArticleService.filterSize(['analysis', 'emis']);
  PagingService.init($scope, $stateParams, $state);
  $scope.emisAnalysis = ArticleService.filterPaged(
    ['analysis', 'emis'],
    $scope.page,
    $scope.itemsPerPage,
    2
  );
}

controllersModule.controller('EmisAnalysisCtrl', EmisAnalysisCtrl);
