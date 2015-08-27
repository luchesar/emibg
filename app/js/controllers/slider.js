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
      title: 'Record boost in new solar power continues massive industry growth',
      text: 'UK leads European solar energy expansion to help renewables overtake output of nuclear power as industry leaders hail ‘tipping point’ for the technology'
    },
    {
      image: 'images/slider/slide2.jpg',
      title: 'South African team may have solved solar puzzle even Google couldn\'t crack',
      text: 'Pioneering technology to deliver the cheapest, small-scale concentrated solar power plants in the world could revolutionise the renewable energy market'
    },
    {
      image: 'images/slider/slide3.jpg',
      title: 'The future is kite powered',
      text: 'Wind turbines are controversial. They are accused of being blots on the landscape, expensive to run and need good winds to work. But the critics could be silenced with a totally new way of generating wind power – using kites. This is a serious proposition. Power-generating kites are far more sophisticated'
    }
  ];
  
}

controllersModule.controller('SliderCtrl', SliderCtrl);
