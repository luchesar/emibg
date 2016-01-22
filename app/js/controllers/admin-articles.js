'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AdminArticlesCtrl($scope, $stateParams, $http, $state, PagingService) {
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $http.get(
    "/api/articles/paged/" +
    ($stateParams.lang ||  "bg") +
    "?categories=news,amis,analysis&p=" + PagingService.pageNumber($stateParams) +
    "&size=" + PagingService.itemsPerPage +
    "&published=both" +
    "&requireTitle=false"
  )
  .then(function(response) {
    $scope.itemsCount = response.data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount);
    $scope.articles = response.data.items;
  })
  .catch(function(err) {
    console.log(err);
  });
}

controllersModule.controller('AdminArticlesCtrl', AdminArticlesCtrl);
