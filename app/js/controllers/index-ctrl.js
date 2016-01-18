'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var data = require('../data.js');

/**
* @ngInject
*/
function IndexCtrl($scope, $location) {
  var isAdmin = $location.path().indexOf("admin") > -1;
  $scope.bannerHidden = isAdmin;

  $scope.contentMdWidth = isAdmin ? "col-md-12" : "col-md-8";

  $scope.rightMdWidth = isAdmin ? "" : "col-md-4";
}

controllersModule.controller('IndexCtrl', IndexCtrl);
