'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');
var uuid = require('uuid');

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
    $scope.article.date = moment().valueOf();
    if (!$scope.article.itemId) {
      $scope.article.itemId = uuid.v1();
    }

    var method = $http.post;
    var url = "/api/articles";
    if ($scope.article.id) {
      method = $http.put;
      url = "/api/articles/" + $scope.article.id;
    }
    method(url, $scope.article)
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

  var editorOptions = function(options, inline, onChange) {
    options.inline = inline;
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
      },
      false,
      function(editor) {
        updateProperty(jQuery(editor.getElement()).html());
      });
  }

  var titleOptions = function(updateProperty) {
    return editorOptions({
        toolbar: 'undo redo',
        menubar: false
      },
      true,
      function(editor) {
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

  var init = function(article) {
    $scope.article = article;

    $scope.articleType = article.category.reduce(function(prev, curr) {
      return curr ? curr : prev;
    }, 'news');
    $scope.bgHtml = $sce.trustAsHtml(article.html.bg);
    $scope.title = angular.copy(article.title);
    $scope.html = angular.copy(article.html);
    $scope.$emit('title', $scope.title);
    $scope.$emit('html', $scope.html);

    $scope.$watch('articleType', function () {
      $scope.article.category = [$scope.articleType];
    });
  }

  if ($stateParams.id) {
    ArticleService.article($stateParams.id)
    .then(init)
    .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
  } else {
    init({
      title: {bg:'', en:''},
      html: {bg:'', en:''},
      category: ['news'],
      image: {}
    });
  }

  $scope.onPicked = function (docs) {
    var imageInfo = docs.shift();
    $scope.article.image = {
      config: {
        fill: true,
        horizontalAlign: "center",
        verticalAlign: "center"
      },
      url: "http://drive.google.com/uc?export=view&id=" + imageInfo.id
    };
    $scope.$apply();
  }
}

controllersModule.controller('AdminArticleCtrl', AdminArticleCtrl);
