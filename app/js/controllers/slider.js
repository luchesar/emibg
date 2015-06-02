'use strict'

var controllersModule = require('./_index');

/**
* @ngInject
*/
function SliderCtrl($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [
    {
      image: 'images/slider/slide1.jpg',
      text: ''
    },
    {
      image: 'images/slider/slide2.jpg',
      text: ''
    },
    {
      image: 'images/slider/slide3.jpg',
      text: ''
    }
  ];
  
}

controllersModule.controller('SliderCtrl', SliderCtrl);
