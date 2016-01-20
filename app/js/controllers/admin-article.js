'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AdminArticleCtrl($scope, $stateParams, ArticleService, $filter, $rootScope, $state, Articles, $http) {
  $scope.previousState = $rootScope.previousState;
  $scope.previousStateParams = $rootScope.previousStateParams;

  $scope.cancel = function() {
    if ($rootScope.previousState) {
      $state.go($scope.previousState, $scope.previousStateParams);
    } else {
      $state.go("app.admin.articles");
    }
  };

  $scope.save = function() {
    $scope.article.html.bg = $scope.editedHtml;
    $scope.article.title.bg = $scope.editedTitle || $scope.article.title.bg;
    $http.put("/api/articles/" + $scope.article.id, $scope.article)
    .then(function(response) {
      console.log("article saved");
    })
    .catch(function(err){
       $scope.err = err;
       console.log(err);
     })
  }


  var editorOptions = function(options, onChange) {
    options.inline = true;
    options.language = $stateParams.lang || 'bg',
    options.skin = 'lightgray';
    options.theme = 'modern';
    options.browser_spellcheck = true;
    options.init_instance_callback = function(editor) {
      var textContentTrigger = function() {
        onChange($scope, editor);
      };

      editor.on('KeyUp', textContentTrigger);
      editor.on('ExecCommand', textContentTrigger);
      editor.on('SetContent', function(e) {
        if (!e.initial)
          textContentTrigger();
      });
    };
    return options;
  }

  $scope.tinymceOptions = editorOptions({
    plugins : "advlist autolink link image imagetools lists charmap print preview autolink lists spellchecker pagebreak layer table save insertdatetime preview media searchreplace print contextmenu paste directionality fullscreen noneditable visualchars nonbreaking template google_tools placeholder",
  
  }, function($scope, editor) {
    $scope.editedHtml = jQuery(editor.getElement()).html();
  });

  $scope.tinymceTitleOptions = editorOptions({
    toolbar: 'undo redo',
    menubar: false
  }, function($scope, editor) {
    $scope.editedTitle = jQuery(editor.getElement()).text();
  });

  ArticleService.article($stateParams.id)
  .then(function(article) {
    $scope.article = article;
    
    $scope.articleType = {};
    $scope.articleType.news = _(article.category).contains('news');
    $scope.articleType.emis = _(article.category).contains('emis');
    $scope.articleType.summaries =_(article.category).contains('summaries');
    
    $scope.$watchCollection('articleType', function () {
      $scope.article.categories = [];
      angular.forEach($scope.articleType, function (value, key) {
        if (value) {
          $scope.article.category.push(key);
        }
      });
    });
  })
  .catch(err => console.log(err));
}

controllersModule.controller('AdminArticleCtrl', AdminArticleCtrl);
