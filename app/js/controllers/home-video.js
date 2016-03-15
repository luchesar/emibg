'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function HomeVideoCtrl($scope, $sce, $http) {
  $http.get("/api/homeVideos?filter[limit]=1")
  .then(function(response) {
    if (response.data.length > 0) {
      $scope.video = $sce.trustAsResourceUrl(response.data[0].videoUrl);
    }
  })
  .catch(err => console.log(err));
}

controllersModule.controller('HomeVideoCtrl', HomeVideoCtrl);
