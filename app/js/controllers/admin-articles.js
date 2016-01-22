'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AdminArticlesCtrl($scope, $stateParams, $http, $state, PagingService) {
  var fetchArticles = function() {
    $http.get(
      "/api/articles/paged/" +
      ($stateParams.lang ||  "bg") +
      "?categories=" + $scope.showCategories +
      "&p=" + PagingService.pageNumber($stateParams) +
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
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се извлекат статиите. Моля опитайте след малко."});
      console.log(err);
    });
  };

  $scope.alerts = [];
  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {page: $scope.page});
  });


  $scope.showCategories = "news,emis,analysis";
  $scope.articleType = {news: true, emis: true, summaries: true};
  $scope.showAllCategories = { selected:false};

  $scope.$watchCollection('articleType', function () {
    $scope.showCategories = "";
    angular.forEach($scope.articleType, function (value, key) {
      if (value) {
        $scope.showCategories = $scope.showCategories + key + ",";
      }
    });
    if ($scope.showCategories === "") {
      $scope.showCategories = "some string that is not a category";
    }
    fetchArticles();
  });

  $scope.showAllCategoriesClick = function () {
    if ($scope.showAllCategories.selected) {
      $scope.articleType = {news: true, emis: true, summaries: true};
      $scope.showCategories = "";
      fetchArticles();
    }
  };
  
  fetchArticles();

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

controllersModule.controller('AdminArticlesCtrl', AdminArticlesCtrl);
