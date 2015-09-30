'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function SummariesAnalysisCtrl($scope, ArticleService) {
  $scope.summariesAnalysis = ArticleService
    .filterChunked(['analysis', 'summaries'], 2);
}

controllersModule.controller('SummariesAnalysisCtrl', SummariesAnalysisCtrl);
