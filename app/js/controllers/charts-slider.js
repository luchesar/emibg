'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function ChartsSliderCtrl($scope) {
  $scope.myInterval = 5000;
  var charts = $scope.charts = [
    {
      type: 'PieChart',
      data: [
         ["Component","cost"],
         ['Services', 20000],
         ['Software', 50000],
         ['Hardware', 80000]
      ],
      options: {
        displayExactValues: true,
        width: 400,
        height: 300,
        is3D: true,
        chartArea: {left:10,top:10,bottom:0,height:"100%"}
      },
      formatters: {
         umber : [{
          columnNum: 1,
          pattern: "$ #,##0.00"
        }]
      }
    },
    {
      type: 'Gauge',
      options: {
        width: 400,
        height: 300,
        redFrom: 90,
        redTo: 100,
        yellowFrom: 75,
        yellowTo: 90,
        minorTicks: 5
      },
      data: [
        ['Label', 'Value'],
        ['Memory', 80],
        ['CPU', 55],
        ['Gas', 25],
        ['Network', 68]
      ]
    }
  ];
}

controllersModule.controller('ChartsSliderCtrl', ChartsSliderCtrl);
