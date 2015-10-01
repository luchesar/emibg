'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function NewsCtrl($scope, ArticleService) {
  $scope.page = 1;
  $scope.itemsPerPage = 6;
  $scope.itemsCount = ArticleService.filterSize(['news']);
  $scope.pageCount = Math.ceil($scope.itemsCount / $scope.itemsPerPage);
  $scope.news = ArticleService.filterPaged(
    ['news'],
    $scope.page,
    $scope.itemsPerPage,
    2
  );

  $scope.$watch('page', function() {
    $scope.news = ArticleService.filterPaged(
      ['news'],
      $scope.page,
      $scope.itemsPerPage,
      2
    );
  });

  $scope.hasNext = function() {
    return $scope.page * $scope.itemsPerPage < $scope.itemsCount;
  }

  $scope.hasPrev = function() {
    return $scope.page > 1;
  }

  $scope.nextPage = function() {
    if ($scope.hasNext()) {
      $scope.page = $scope.page + 1;
    }
  };

  $scope.previousPage = function() {
    if ($scope.hasPrev()) {
      $scope.page = $scope.page - 1;
    }
  };
}

controllersModule.controller('NewsCtrl', NewsCtrl);
