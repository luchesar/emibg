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

  service.itemsPerPage = 26;

  service.pageCount = function(itemsCount) {
    return Math.ceil(itemsCount / service.itemsPerPage);
  }

  service.init = function($scope, $stateParams, $state, onPageChange) {
    $scope.page = service.pageNumber($stateParams);

    $scope.$watch('page', onPageChange || function() {
      $state.go('.', {page: $scope.page});
    });

    $scope.hasNext = function() {
      return $scope.page * service.itemsPerPage < $scope.itemsCount;
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
