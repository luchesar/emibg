'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');
var uuid = require('uuid');

/**
* @ngInject
*/
function AdminArticleCtrl($scope, $stateParams, ArticleService, $filter, $rootScope, $state, Articles, $http, $sce, $timeout, EmiAuth, ErrorHandling) {
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
    $scope.article.html = $scope.html;

    var method = $http.post;
    var url = "/api/articles";
    if ($scope.article.id) {
      method = $http.put;
      url = "/api/articles/" + $scope.article.id;
    }
    ErrorHandling.handle(method(url, $scope.article, EmiAuth.addAuthHeader({})))
    .then(function(data) {
      $scope.article = data;
      $scope.html = data.html;
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Статията е записана успешно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише статията в момента. Моля опитайте отново. " + err});
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
        if (onChange) onChange(editor);
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

  var editor = null

  var htmlOptions = function(updateProperty) {
    return editorOptions(
      {
        plugins : [
          'google_tools advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'template textcolor colorpicker textpattern'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link google_tools image | print preview media | forecolor',
        image_caption: true,
        image_advtab: true,
        language : "bg",
        paste_data_images: true
      },
      false
    );
  }

  var titleOptions = function(updateProperty) {
    return editorOptions({
        toolbar: 'undo redo',
        menubar: false
      },
      true
    );
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
  
  $scope.setPublicationDate = function() {
    $scope.article.publicationDate = $scope.newPublicationDate.date.getTime();
  }

  var init = function(article) {
    $scope.article = article;

    $scope.articleType = article.category.reduce(function(prev, curr) {
      return curr ? curr : prev;
    }, 'news');
    $scope.bgHtml = $sce.trustAsHtml(article.html.bg);
    $scope.enHtml = $sce.trustAsHtml(article.html.en);
    var html = angular.copy(article.html);
    $scope.html = html;

    $scope.$watch('articleType', function () {
      $scope.article.category = [$scope.articleType];
    });

    if (!article.publicationDate) {
      article.publicationDate = +moment();
    }
    var publicationDate = moment(article.publicationDate);
    $scope.newPublicationDate = {
      date: moment(publicationDate).hour(0).minutes(0).seconds(0).toDate(),
    }
  }

  if ($stateParams.id) {
    ArticleService.article($stateParams.id)
    .then(init)
    .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
  } else {
    init({
      author: {bg:'', en:''},
      title: {bg:'', en:''},
      html: {bg:'', en:''},
      category: ['news'],
      image: {
        config: {
          fill: true,
          horizontalalign: "center",
          verticalalign: "center"
        }
      },
      published: false,
      deleted: false
    });
  }

  $scope.onPicked = function (docs) {
    var imageInfo = docs.shift();
    $scope.article.image = {
      config: {
        fill: true,
        horizontalalign: "center",
        verticalalign: "center"
      },
      url: "http://drive.google.com/uc?export=view&id=" + imageInfo.id
    };
    $scope.$apply();
  }
}

controllersModule.controller('AdminArticleCtrl', AdminArticleCtrl);
