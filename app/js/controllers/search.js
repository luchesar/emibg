'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function SearchCtrl($scope, $stateParams, $http, $state, PagingService) {
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {q: $stateParams.q, page: $scope.page});
  });

  var lang = $stateParams.lang || "bg";

  $http.get("/api/searches/" + lang +
           "?q=" + ($stateParams.q || "*") +
           "&p=" + PagingService.pageNumber($stateParams) +
           "&size=" + $scope.itemsPerPage)
  .then(function(response) {
    $scope.itemsCount = response.data.total;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
    $scope.items =
      _(response.data.hits.map(hit => hit._source))
        .chunk(2).toArray();
  })
  .catch(function(err) {
    console.log(err); 
  });
}

controllersModule.controller('SearchCtrl', SearchCtrl);

