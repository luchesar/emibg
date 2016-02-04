'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AdminArticlesCtrl($scope, $stateParams, $http, $state, PagingService, $sce, EmiAuth) {
  var fetchArticles = function() {
    $scope.alerts = [];
    $http.get(
      "/api/articles/paged/" +
      ($stateParams.lang ||  "bg") +
      "?categories=" + $scope.showCategories +
      "&p=" + PagingService.pageNumber($stateParams) +
      "&size=" + $scope.itemsPerPage +
      "&published=" + $scope.published +
      "&requireTitle=false"
    )
    .then(function(response) {
      $scope.itemsCount = response.data.size;
      $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
      $scope.articles = response.data.items;
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се извлекат статиите. Моля опитайте след малко."});
      console.log(err);
    });
  };

  $scope.delete = function(id) {
    $scope.alerts = [];
    $http.delete(
      "/api/articles/delete/" + id,
      EmiAuth.addAuthHeader({})
    )
    .then(response => {
      $scope.articles = $scope.articles.filter(article => article.id != id);
      $scope.alerts.push({type: 'success', msg: "Статията е успешно изтрита!<a href='#' ng-click=\"restore('" + id + "')\">UNDO</a>"});
    })
    .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се изтрие статията. Моля опитайте след малко."});
    })
  }

  $scope.restore = function(id) {
    $http.delete(
      "/api/articles/delete/" + id,
      EmiAuth.addAuthHeader({params: {"delete": "false"}})
    )
    .then(response => {
      $state.go('.', {
        page: $scope.page,
        published: $scope.published + "",
        showCategories: $scope.showCategories
      }, {reload: true});
    })
    .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се възтанови изтритата статията."});
    })
  }

  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {
      page: $scope.page,
      published: $scope.published + "",
      showCategories: $scope.showCategories
    });
  });
  $scope.itemsPerPage = 8;

  if ($stateParams.published === "both") {
    $scope.published = "both";
    $scope.publishedFilter = {published: true, notPublished: true};
  } else if ($stateParams.published === "true") {
    $scope.published = true;
    $scope.publishedFilter = {published: true, notPublished: false};
  } else if ($stateParams.published === "false") {
    $scope.published = false;
    $scope.publishedFilter = {published: false, notPublished: true};
  } else {
    $scope.published = "none";
    $scope.publishedFilter = {published: false, notPublished: false};
  }

  $scope.alerts = [];
  $scope.showCategories = $stateParams.showCategories || "news,emis,summaries";
  $scope.articleType = {news: true, emis: true, summaries: true};
  //$scope.showAllCategories = { selected:false};

  var articleTypeInitialEvent = true;
  $scope.$watchCollection('articleType', function () {
    if (!articleTypeInitialEvent) {
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
    }
    articleTypeInitialEvent = false;
  });

  var publishedFilterInitialEvent = true;
  $scope.$watchCollection('publishedFilter', function () {
    if (!publishedFilterInitialEvent) {
      var publishedFilter = $scope.publishedFilter;
      if (publishedFilter.published && publishedFilter.notPublished) {
        $scope.published = "both";
      } else if (publishedFilter.published && !publishedFilter.notPublished) {
        $scope.published = "true";
      } else if (!publishedFilter.published && publishedFilter.notPublished) {
        $scope.published = "false";
      } else {
        $scope.published = "none";
      }
      fetchArticles();
    }
    publishedFilterInitialEvent = false;
  });

  fetchArticles();

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}

controllersModule.controller('AdminArticlesCtrl', AdminArticlesCtrl);
