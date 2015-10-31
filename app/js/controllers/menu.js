'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function MenuCtrl($scope, $timeout) {
  $scope.search = {text: ""};

  $scope.searchVisible = false;

  $scope.showSearch = function() {
      $scope.searchVisible = true;
      $timeout(function(){
          $("#searchField").focus();
      });
  };

  $scope.hideSearch = function() {
      $scope.searchVisible = false;
  };

  $scope.$watch('search.text', function (val) {
     console.log(val);
  });
}

controllersModule.controller('MenuCtrl', MenuCtrl);
