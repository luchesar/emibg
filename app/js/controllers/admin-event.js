'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');

/**
* @ngInject
*/
function AdminEventCtrl($scope, $stateParams, EventService, $filter, $rootScope, $state, Events, $http, $sce) {
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
    nullify($scope.event.title);

    $http.put("/api/events/" + $scope.event.id, $scope.event)
    .then(function(response) {
      $scope.alerts.push({type: 'success', msg: $sce.trustAsHtml("Събитието е записана успещно")});
    })
    .catch(function(err) {
      $scope.alerts.push({type: 'danger', msg: "Не е възможно да се запише събитието в момента. Моля опитайте след малко."});
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
      $scope.event.html.bg = html;
      $scope.bgHtml = $sce.trustAsHtml(html);
  });
  $scope.htmlEnOptions = htmlOptions(function(html) {
      $scope.event.html.en = html;
      $scope.enHtml = $sce.trustAsHtml(html);
  });
  $scope.titleBgOptions = titleOptions(title => $scope.event.title.bg = title);
  $scope.titleEnOptions = titleOptions(title => $scope.event.title.en = title);

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
      end: +moment() + 3600000
    });
  }
}

controllersModule.controller('AdminEventCtrl', AdminEventCtrl);
