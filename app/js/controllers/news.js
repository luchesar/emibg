'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function NewsCtrl($scope, ArticleService) {
  $scope.news = ArticleService
    .filterChunked(['news'], 2);
}

controllersModule.controller('NewsCtrl', NewsCtrl);
