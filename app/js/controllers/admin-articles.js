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
      "&size=8" +
      "&published=" + $scope.published +
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

  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {
      page: $scope.page,
      published: $scope.published + "",
      showCategories: $scope.showCategories
    });
  });

  if ($stateParams.published === "both") {
    $scope.published = "both";
    $scope.publishedFilter = {published: true, notPublished: true};
  } else if ($stateParams.published === "true") {
    $scope.published = "true";
    $scope.publishedFilter = {published: true, notPublished: false};
  } else if ($stateParams.published === "false") {
    $scope.published = "false";
    $scope.publishedFilter = {published: false, notPublished: true};
  } else {
    $scope.published = "none";
    $scope.publishedFilter = {published: false, notPublished: false};
  }

  $scope.alerts = [];
  $scope.showCategories = $stateParams.showCategories || "news,emis,analysis";
  $scope.articleType = {news: true, emis: true, summaries: true};
  //$scope.showAllCategories = { selected:false};

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

  $scope.$watchCollection('publishedFilter', function () {
    var publishedFilter = $scope.publishedFilter;
    if (publishedFilter.published && publishedFilter.notPublished) {
      $scope.published = "both";
    } else if (publishedFilter.published && !publishedFilter.notPublished) {
      $scope.published = "true";
    } else if (!publishedFilter.published && publishedFilter.notPublished) {
      $scope.published = "false";
    } else {
      console.log("none");
      $scope.published = "none";
    }
    fetchArticles();
  });


 /* $scope.showAllCategoriesClick = function () {
    if ($scope.showAllCategories.selected) {
      $scope.articleType = {news: true, emis: true, summaries: true};
      $scope.showCategories = "";
      fetchArticles();
    }
  };*/
  
  fetchArticles();

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

controllersModule.controller('AdminArticlesCtrl', AdminArticlesCtrl);
