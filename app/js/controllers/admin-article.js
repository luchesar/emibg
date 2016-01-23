'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function AdminArticleCtrl($scope, $stateParams, ArticleService, $filter, $rootScope, $state, Articles, $http, $sce) {
  $scope.alerts = [];
  $scope.previousState = $rootScope.previousState;
  $scope.previousStateParams = $rootScope.previousStateParams;

  $scope.cancel = function() {
    if ($rootScope.previousState) {
      $state.go($scope.previousState, $scope.previousStateParams);
    } else {
      $state.go("app.admin.articles");
    }
  };

  var nullify = function(field) {
    if(field.bg != null && field.bg != undefined && field.bg.trim() === "")
      field.bg = null;
    if(field.en != null && field.en != undefined && field.en.trim() === "")
      field.en = null;
  }

  $scope.save = function() {
    $scope.alerts = [];

    // Remove the empty props to be able to filter with exists in ES
    nullify($scope.article.title);

    $http.put("/api/articles/" + $scope.article.id, $scope.article)
    .then(function(response) {
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Статията е записана успещно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише статията в момента. Моля опитайте след малко."});
      console.log(err);
    });
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };


  var editorOptions = function(options, onChange) {
    options.inline = true;
    options.language = $stateParams.lang || 'bg',
    options.skin = 'lightgray';
    options.theme = 'modern';
    options.browser_spellcheck = true;
    options.init_instance_callback = function(editor) {
      var textContentTrigger = function() {
        onChange(editor);
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

  var htmlOptions = function(updateProperty) {
    return editorOptions({
      plugins : "advlist autolink link image imagetools lists charmap print preview autolink lists spellchecker pagebreak layer table save insertdatetime preview media searchreplace print contextmenu paste directionality fullscreen noneditable visualchars nonbreaking template google_tools placeholder",
      }, function(editor) {
        updateProperty(jQuery(editor.getElement()).html());
      });
  }

  var titleOptions = function(updateProperty) {
    return editorOptions({
        toolbar: 'undo redo',
        menubar: false
      }, function(editor) {
        updateProperty(jQuery(editor.getElement()).text());
      });
  }

  $scope.htmlBgOptions = htmlOptions(function(html) {
      $scope.article.html.bg = html;
      $scope.bgHtml = $sce.trustAsHtml(html);
  });
  $scope.htmlEnOptions = htmlOptions(function(html) {
      $scope.article.html.en = html;
      $scope.enHtml = $sce.trustAsHtml(html);
  });
  $scope.titleBgOptions = titleOptions(title => $scope.article.title.bg = title);
  $scope.titleEnOptions = titleOptions(title => $scope.article.title.en = title);

  ArticleService.article($stateParams.id)
  .then(function(article) {
    $scope.article = article;
    
    $scope.articleType = {};
    $scope.articleType.news = _(article.category).contains('news');
    $scope.articleType.emis = _(article.category).contains('emis');
    $scope.articleType.summaries =_(article.category).contains('summaries');
    $scope.title = JSON.parse(JSON.stringify(article.title));
    $scope.html = JSON.parse(JSON.stringify(article.html));
    
    $scope.$watchCollection('articleType', function () {
      $scope.article.category = [];
      angular.forEach($scope.articleType, function (value, key) {
        if (value) {
          $scope.article.category.push(key);
        }
      });
    });
    $scope.bgHtml = $sce.trustAsHtml(article.html.bg);
  })
  .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));


  $scope.onPicked = function (docs) {
    docs.map(doc => console.log(JSON.stringify(doc)));
    var imageInfo = docs.shift();
    $scope.article.image = {
      config: {
        fill: true,
        horizontalAlign: "center",
        verticalAlign: "center"
      },
      url: imageInfo.url,
      iconUrl: imageInfo.iconUrl
    };
    $scope.$apply();
    console.log(JSON.stringify($scope.article.image));
  }
}

controllersModule.controller('AdminArticleCtrl', AdminArticleCtrl);
