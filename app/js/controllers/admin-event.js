'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');
var tz = require('moment-timezone');
var uuid = require('uuid');
var timeUtils = require('./time-utils');

/**
* @ngInject
*/
function AdminEventCtrl($scope, $stateParams, EventService, $filter, $rootScope, $state, Events, $http, $sce, EmiAuth, ErrorHandling) {
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
    $scope.event.html = $scope.html;
    // Remove the empty props to be able to filter with exists in ES
    nullify($scope.event.title);

    var method = $http.post;
    var url = "/api/events";
    if ($scope.event.id) {
      method = $http.put;
      url = "/api/events/" + $scope.event.id;
    }
    ErrorHandling.handle(method(url, $scope.event, EmiAuth.addAuthHeader({})))
    .then(function(data) {
      $scope.event = data;
      $scope.html = data.html;
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Събитието е записано успешно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише събитието в момента. Моля опитайте отново." + err});
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
      }
    );
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
    $scope.event.start = timeUtils.toMillisUTC($scope.newstart.date) +
      timeUtils.toMillisUTC($scope.newstart.time);
  }

  $scope.setEndDate = function() {
    $scope.event.end = timeUtils.toMillisUTC($scope.newend.date) +
      timeUtils.toMillisUTC($scope.newend.time);
  }

  var init = function(event) {
    $scope.event = event;

    $scope.title = angular.copy(event.title);
    $scope.html = angular.copy(event.html);
    $scope.bgHtml = $sce.trustAsHtml(event.html.bg);
    $scope.enHtml = $sce.trustAsHtml(event.html.bg);
    var timeFormat = "HH-mm-ss";
    var dateFormat = "YYYY-MM-DD";
    var start = moment(event.start).tz('UTC');
    var end = moment(event.end).tz('UTC');
    var startDate = start.clone().hour(0).minutes(0).seconds(0);
    var startTime = moment(0).tz('UTC').hour(start.hour()).minutes(start.minutes()).seconds(0);
    var endDate = end.clone().hour(0).minute(0).seconds(0);
    var endTime = moment(0).tz('UTC').hour(end.hour()).minutes(end.minutes()).seconds(0);
    $scope.newstart = {
      date: timeUtils.toDate(startDate, 0),
      time: timeUtils.toDate(startTime)
    }
    $scope.newend = {
      date: timeUtils.toDate(endDate, 0),
      time: timeUtils.toDate(endTime)
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
