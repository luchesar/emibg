'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');

var currentLang = function(stateParams, translate) {
    if (stateParams.lang !== undefined) {
        return stateParams.lang;
    } else {
        return translate.proposedLanguage();
    }
}

/**
* @ngInject
*/
function CalendarCtrl($scope,$q,
        $compile, $state, $stateParams, $translate, $filter,
        EventService, uiCalendarConfig) {

    $scope.eventSources = [];

    /* event source that contains custom events on the scope */
    var eventsFilter = EventService.filter(10000);
    eventsFilter.then(function(items) {
      $scope.events = items.map(function(event){
        return {
          id: event.id,
          title: $filter('lang')(event.title),
          start: moment(event.start).toDate(),
          end: moment(event.end).toDate()
        };
      });
      /* event sources array*/
      $scope.eventSources = [$scope.events];
    });
    /* alert on eventClick */
    $scope.eventClick = function( event, jsEvent, view){
        $state.go("app.menu.events.event", {page: 1, id: event.id})
    };

    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
      element.attr({'tooltip': event.title,
                    'tooltip-append-to-body': true});
      $compile(element)($scope);
    };

    /* config object */
    $scope.uiConfig = {
        height: 450,
        editable: false,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        lang: currentLang($stateParams, $translate),
        eventClick: $scope.eventClick,
        eventRender: $scope.eventRender
    };

}

controllersModule.controller('CalendarCtrl', CalendarCtrl);
