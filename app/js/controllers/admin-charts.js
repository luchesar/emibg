'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminChartsCtrl($scope, $stateParams, $http, $state, PagingService) {
  $scope.alerts = [];
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });

  $http.get(
    "/api/charts/paged/" +
    ($stateParams.lang ||  "bg") +
    "?p=" + PagingService.pageNumber($stateParams) +
    "&size=" + PagingService.itemsPerPage +
    "&published=both"
  )
  .then(function(response) {
    $scope.itemsCount = response.data.size;
    $scope.pageCount = PagingService.pageCount($scope.itemsCount);
    $scope.charts = _(response.data.items).chunk(3).toArray();
  })
  .catch(function(err) {
    console.log(err);
  });

  $scope.delete = function(id) {
    $scope.alerts = [];
    $http.delete("/api/charts/delete/" + id)
    .then(response => {
      if (response.status === 500) {
        $scope.alerts.push({type: 'danger', msg: "Не е възможно да се изтрие графиката. Грешка: " + response.data.error.message});
      } else {
        $scope.charts = _($scope.charts).flatten().filter(ch => ch.id != id).chunk(3).toArray();
        $scope.alerts.push({type: 'success', msg: "Графиката е успешно изтрита!<a href='#' ng-click=\"restore('" + id + "')\">UNDO</a>"});
      }
    })
    .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се изтрие графиката. Моля опитайте след малко."});
    })
  }

  $scope.restore = function(id) {
    $scope.alerts = [];
    $http.delete("/api/charts/delete/" + id,{params: {"delete": "false"}})
    .then(response => {
      $state.go('.', {page: $scope.page}, {reload: true});
    })
    .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се възтанови изтритата графика."});
    })
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}

controllersModule.controller('AdminChartsCtrl', AdminChartsCtrl);
