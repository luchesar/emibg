'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function AllPartnersCtrl($scope, PartnerService) {
  $scope.allPartners = PartnerService.allPartners();
}

controllersModule.controller('AllPartnersCtrl', AllPartnersCtrl);
