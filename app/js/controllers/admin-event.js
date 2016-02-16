'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');
var uuid = require('uuid');

/**
* @ngInject
*/
function AdminEventCtrl($scope, $stateParams, EventService, $filter, $rootScope, $state, Events, $http, $sce, EmiAuth) {
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
    $scope.event.date = moment().valueOf();
    if (!$scope.event.itemId) {
      $scope.event.itemId = uuid.v1();
    }

    // Remove the empty props to be able to filter with exists in ES
    nullify($scope.event.title);

    var method = $http.post;
    var url = "/api/events";
    if ($scope.event.id) {
      method = $http.put;
      url = "/api/events/" + $scope.event.id;
    }
    method(url, $scope.event, EmiAuth.addAuthHeader({}))
    .then(function(response) {
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Събитието е записана успешно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише събитието в момента. Моля опитайте след малко."});
    });
  }

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  var editorOptions = function(options, onChange) {
    options.inline = false;
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
    return editorOptions(
      {
        plugins : [
          'google_tools advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'template paste textcolor colorpicker textpattern'
        ],
        toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link google_tools image | print preview media | forecolor',
        image_caption: true,
        image_advtab: true
      }, function(editor) {
        updateProperty(jQuery(editor.getElement()).html());
      });
  }

  $scope.htmlBgOptions = htmlOptions(function(html) {
      $scope.event.html.bg = html;
      $scope.bgHtml = $sce.trustAsHtml(html);
  });
  $scope.htmlEnOptions = htmlOptions(function(html) {
      $scope.event.html.en = html;
      $scope.enHtml = $sce.trustAsHtml(html);
  });

  $scope.setStartDate = function() {
    $scope.event.start = $scope.newstart.date.getTime() + $scope.newstart.time.getTime();
  }

  $scope.setEndDate = function() {
    $scope.event.end = $scope.newend.date.getTime() + $scope.newend.time.getTime();
  }

  var init = function(event) {
    $scope.event = event;
    
    $scope.title = angular.copy(event.title);
    $scope.html = angular.copy(event.html);
    $scope.bgHtml = $sce.trustAsHtml(event.html.bg);
    $scope.enHtml = $sce.trustAsHtml(event.html.bg);
    var timeFormat = "HH-mm-ss";
    var dateFormat = "YYYY-MM-DD";
    var start = moment(event.start);
    var end = moment(event.end);
    $scope.newstart = {
      date: moment(start).hour(0).minutes(0).seconds(0).toDate(),
      time: moment(0).hour(start.hour()).minutes(start.minutes()).seconds(start.seconds()).toDate()
    }
    $scope.newend = {
      date: moment(end).hour(0).minutes(0).seconds(0).toDate(),
      time: moment(0).hour(end.hour()).minutes(end.minutes()).seconds(end.seconds()).toDate()
    }
  };

  if ($stateParams.id) {
    EventService.event($stateParams.id)
    .then(init)
    .catch(err => $scope.alerts.push({type: 'danger', msg: err + ""}));
  } else {
    init({
      title: {bg:'', en:''},
      html: {bg:'', en:''},
      access: {bg:'', en:''},
      type: {bg:'', en:''},
      organiser: {bg:'', en:''},
      place: {bg:'', en:''},
      start: +moment(),
      end: +moment() + 3600000,
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
}

controllersModule.controller('AdminEventCtrl', AdminEventCtrl);
