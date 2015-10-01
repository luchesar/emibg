'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function NewsCtrl($scope, $stateParams, $state, ArticleService, PagingService) {
  $scope.itemsCount = ArticleService.filterSize(['news']);
  PagingService.init($scope, $stateParams, $state);

  $scope.news = ArticleService.filterPaged(
    ['news'],
    $scope.page,
    $scope.itemsPerPage,
    2
  );
}

controllersModule.controller('NewsCtrl', NewsCtrl);
