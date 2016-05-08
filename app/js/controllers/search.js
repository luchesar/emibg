'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function SearchCtrl($scope, $stateParams, $http, $state, PagingService, ErrorHandling) {
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {q: $stateParams.q, page: $scope.page});
  });

  var lang = $stateParams.lang || "bg";

  $scope.alerts = [];
  var searchTerm = $stateParams.q;
  if (searchTerm)
    searchTerm = _(searchTerm.split(" "))
      .filter(word => word.length > 2)
      .reduce((result, word) => result + " " + word)

  ErrorHandling.handle($http.get("/api/searches/" + lang +
           "?q=" + (searchTerm || "*") +
           "&p=" + PagingService.pageNumber($stateParams) +
           "&size=" + $scope.itemsPerPage))
  .then(function(data) {
    $scope.itemsCount = data.total;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
    $scope.items =
      _(data.hits.map(hit => hit._source))
        .chunk(2).toArray();
  })
  .catch(err => {
    $scope.alerts.push({type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err});
  });
}

controllersModule.controller('SearchCtrl', SearchCtrl);

