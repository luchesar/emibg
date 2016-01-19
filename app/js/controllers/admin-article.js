'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function AdminArticleCtrl($scope, $sce, $stateParams, ArticleService, $filter) {
  $scope.tinymceOptions = {
    onChange: function(e) {
      // put logic here for keypress and cut/paste changes
    },
    inline: true,
    plugins : 'advlist autolink link image lists charmap print preview',
    skin: 'lightgray',
    theme : 'modern',
    browser_spellcheck: true
  };
  $scope.tinymceTitleOptions = {
    inline: true,
    toolbar: 'undo redo',
    menubar: false,
    skin: 'lightgray',
    theme : 'modern',
    browser_spellcheck: true
  };

  ArticleService.article($stateParams.id)
  .then(function(article) {
    $scope.article = article;
    $scope.html = $filter('lang')(article.html);
    $scope.title = $filter('lang')(article.title);
  })
  .catch(err => console.log(err));
}

controllersModule.controller('AdminArticleCtrl', AdminArticleCtrl);
