'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function EmisAnalysisCtrl($scope, ArticleService) {
  $scope.emisAnalysis = ArticleService
    .filterChunked(['analysis', 'emis'], 2);
}

controllersModule.controller('EmisAnalysisCtrl', EmisAnalysisCtrl);
