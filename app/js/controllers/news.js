'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function NewsCtrl($scope, $stateParams, $state, ArticleService) {
  var pageNumber = function() {
    var p = $stateParams.page;
    if (p < 1) {
      return 1;
    } else if (p > $scope.pageCount) {
      return $scope.pageCount;
    } else {
      return p;
    }
  }

  $scope.itemsPerPage = 6;
  $scope.itemsCount = ArticleService.filterSize(['news']);
  $scope.pageCount = Math.ceil($scope.itemsCount / $scope.itemsPerPage);
  $scope.page = pageNumber();

  $scope.news = ArticleService.filterPaged(
    ['news'],
    $scope.page,
    $scope.itemsPerPage,
    2
  );

  $scope.$watch('page', function() {
    $state.go('.', {page: $scope.page});
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
