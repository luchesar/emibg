'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function MenuCtrl($scope, ArticleService, EventService) {
  $scope.searchVisible = false;
  $scope.showSearch = function() {
      $scope.searchVisible = true;
      $("#searchField").focus();
  };
  $scope.hideSearch = function() {
      $scope.searchVisible = false;
  };
}

controllersModule.controller('MenuCtrl', MenuCtrl);
