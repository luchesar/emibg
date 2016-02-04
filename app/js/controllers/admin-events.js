'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

function AdminEventsCtrl($scope, $stateParams, $http, $state, PagingService, EmiAuth) {
  var fetchEvents = function() {
    $http.get(
      "/api/events/paged/" +
      ($stateParams.lang ||  "bg") +
      "?p=" + PagingService.pageNumber($stateParams) +
      "&size=" + $scope.itemsPerPage +
      "&published=" + $scope.published +
      "&requireTitle=false"
    )
    .then(function(response) {
      $scope.itemsCount = response.data.size;
      $scope.pageCount = PagingService.pageCount($scope.itemsCount, $scope.itemsPerPage);
      $scope.events = response.data.items;
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се извлекат събитията. Моля опитайте след малко."});
      console.log(err);
    });
  }

  $scope.delete = function(id) {
    $scope.alerts = [];
    $http.delete(
      "/api/events/delete/" + id,
      EmiAuth.addAuthHeader({})
    )
    .then(response => {
      $scope.events = $scope.events.filter(event => event.id != id);
      $scope.alerts.push({type: 'success', msg: "Събитието е успешно изтрито!<a href='#' ng-click=\"restore('" + id + "')\">UNDO</a>"});
    })
    .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се изтрие събитието. Моля опитайте след малко."});
    })
  }

  $scope.restore = function(id) {
    $http.delete(
      "/api/events/delete/" + id,
      EmiAuth.addAuthHeader({params: {"delete": "false"}})
    )
    .then(response => {
      $state.go('.', {
        page: $scope.page,
        published: $scope.published + ""
      }, {reload: true});
    })
    .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се възтанови изтритото събитие."});
    })
  }

  $scope.pageCount = "Loading";
  PagingService.init($scope, $stateParams, $state, function(){
    $state.go('.', {
      page: $scope.page,
      published: $scope.published + ""
    });
  });

  $scope.itemsPerPage = 8;
  
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
        console.log("none");
        $scope.published = "none";
      }
      fetchEvents();
    }
    publishedFilterInitialEvent = false;
  });

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  fetchEvents();
}

controllersModule.controller('AdminEventsCtrl', AdminEventsCtrl);
