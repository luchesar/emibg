'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function FullArticleCtrl($scope, $rootScope, $sce, $stateParams, ArticleService, $filter, $document, $timeout, $location) {
  $document.scrollTopAnimated(0, 190);

  $scope.alerts = [];
  ArticleService.article($stateParams.id)
  .then(function(article) {
    $scope.location = $location.absUrl();
    $scope.article = article;
    $scope.articleHtml = $sce.trustAsHtml($filter('lang')($scope.article.html));
    $timeout(function(){
      $rootScope.pageTitle = $filter('lang')(article.title) + ' \u2014 ' + $rootScope.pageTitle;
      $rootScope.$broadcast('emiTitleChangeAttempt');
    }, 80);
  })
  .catch(err => {
      $scope.alerts.push({type: 'danger', msg: "Ами сега!? Възникнала е грешка по при комуникацията със сървъра. Моля опитайте отново по-късно. " + err});
      console.log("APP ERROR: " + err);
  });
}

controllersModule.controller('FullArticleCtrl', FullArticleCtrl);
