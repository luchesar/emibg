'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function NewsCtrl($scope, $stateParams, $state, ArticleService, PagingService) {
  $scope.pageCount = "Loading";
  ArticleService.filterSize(['news'])
  .then(function(count) {
    $scope.itemsCount = count.count;
    PagingService.init($scope, $stateParams, $state);
    ArticleService.filterPaged(
      ['news'],
      $scope.page,
      $scope.itemsPerPage,
      2
    ).then(items => $scope.news = items);
 });
}

controllersModule.controller('NewsCtrl', NewsCtrl);
