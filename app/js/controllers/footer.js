'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FooterCtrl($scope, $document) {
  $scope.scrollToTop = function() {
    $document.scrollTopAnimated(0, 190);
  }
}

controllersModule.controller('FooterCtrl', FooterCtrl);
