'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function NewsCtrl($scope, $stateParams, $http, $state, $document, PagingService, ErrorHandling) {
  $document.scrollTopAnimated(0, 190);
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $scope.alerts = [];
  ErrorHandling.handle($http.get(
    "/api/articles/paged/" +
    ($stateParams.lang ||  "bg") +
    "?categories=news&p=" + PagingService.pageNumber($stateParams) +
    "&size=" + $scope.itemsPerPage +
    "&orderby=publicationDate%20DESC"
  ))
  .then(function(data) {
    $scope.itemsCount = data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
    $scope.news = _(data.items)
        .chunk(2).toArray();
  })
  .catch(err => {
    $scope.alerts.push({type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err});
  });
}

controllersModule.controller('NewsCtrl', NewsCtrl);
