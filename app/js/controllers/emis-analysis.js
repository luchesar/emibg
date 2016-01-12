'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function EmisAnalysisCtrl($scope, $stateParams, $state, ArticleService, PagingService) {
  ArticleService.filterSize(['emis'])
  .then(function(count) {
    $scope.itemsCount = count.count;
    PagingService.init($scope, $stateParams, $state);
    ArticleService.filterPaged(
      ['emis'],
      $scope.page,
      $scope.itemsPerPage,
      2
    ).then(items => $scope.emisAnalysis = items);
  });
}

controllersModule.controller('EmisAnalysisCtrl', EmisAnalysisCtrl);
