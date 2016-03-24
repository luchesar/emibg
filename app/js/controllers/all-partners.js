'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/

function AllPartnersCtrl($scope, PartnerService) {                                                                                                  
	$scope.allPartners = PartnerService.allPartners();
	$scope.members = $scope.allPartners.filter(partner => partner.type == "member");
	$scope.partners = $scope.allPartners.filter(partner => partner.type == "partner");
}

controllersModule.controller('AllPartnersCtrl', AllPartnersCtrl);
