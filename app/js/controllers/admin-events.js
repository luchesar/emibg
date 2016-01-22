'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminEventsCtrl($scope, $stateParams, $http, $state, PagingService) {
  var fetchEvents = function() {
    $http.get(
      "/api/events/paged/" +
      ($stateParams.lang ||  "bg") +
      "?p=" + PagingService.pageNumber($stateParams) +
      "&size=8" +
      "&published=" + $scope.published +
      "&requireTitle=false"
    )
    .then(function(response) {
      $scope.itemsCount = response.data.size;
      $scope.pageCount = PagingService.pageCount($scope.itemsCount);
      $scope.events = response.data.items;
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се извлекат събитията. Моля опитайте след малко."});
      console.log(err);
    });
  }

  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {
      page: $scope.page,
      published: $scope.published + ""
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
    fetchEvents();
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  fetchEvents();
}

controllersModule.controller('AdminEventsCtrl', AdminEventsCtrl);
