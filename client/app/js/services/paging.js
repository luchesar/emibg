'use strict';

var servicesModule = require('./_index.js');

function PagingService() {
  var service = {};

  var pageNumber = function($scope, $stateParams) {
    var p = $stateParams.page;
    p = p || 1;
    if (p < 1) {
      return 1;
    } else if (p > $scope.pageCount) {
      return $scope.pageCount;
    } else {
      return p;
    }
  }

  service.init = function($scope, $stateParams, $state, onPageChange) {
    $scope.itemsPerPage = 20;
    $scope.pageCount = Math.ceil($scope.itemsCount / $scope.itemsPerPage);
    $scope.page = pageNumber($scope, $stateParams);

    $scope.$watch('page', onPageChange || function() {
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

  return service;
}

servicesModule.service('PagingService', PagingService);
