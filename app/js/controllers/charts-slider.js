'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function ChartsSliderCtrl($scope) {
  $scope.myInterval = 10000;
  var lbls1 = [

  ];
  var charts = $scope.charts = [
    {
       type: 'chart-bar',
       labels: ["January", "February", "March", "April", "May", "June", "July"],
       series: ['Price of Gas', 'Price of Petrol'],
       data: [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
       ]
    }
  ]
}

controllersModule.controller('ChartsSliderCtrl', ChartsSliderCtrl);
