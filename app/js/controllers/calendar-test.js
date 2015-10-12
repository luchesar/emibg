'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');
var moment = require('moment');

/**
* @ngInject
*/
function CalendarTestCtrl($scope,$compile,$state, $filter, EventService, uiCalendarConfig) {
   var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';

    /* event source that contains custom events on the scope */
    $scope.events = EventService.filter().map(function(event){
      console.log("Adding event:" + event);
      return {
        id: event.id,
        title: $filter('lang')(event.title),
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate()
      };
    }).toArray();

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
        editable: true,
        header: {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.eventClick,
        eventRender: $scope.eventRender
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}

controllersModule.controller('CalendarTestCtrl', CalendarTestCtrl);
