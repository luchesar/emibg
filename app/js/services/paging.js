'use strict';

var servicesModule = require('./_index.js');

function PagingService() {
  var service = {};

  service.pageNumber = function($stateParams) {
    var p = $stateParams.page;
    p = p || 1;
    if (p < 1) return 1;
    else return p;
  }


  service.pageCount = function(itemsCount, itemsPerPage) {
    return Math.ceil(itemsCount / itemsPerPage);
  }

  service.init = function($scope, $stateParams, $state, onPageChange) {
    $scope.page = service.pageNumber($stateParams);
    $scope.itemsPerPage = 26;

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
