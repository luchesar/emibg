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
      title: {
        bg: 'Рекордено увеличение в слънчевата енергия допринася за драстичен прираст в отрасъла.',
        en: 'Record boost in new solar power continues massive industry growth'
      },
      text: {
        bg: 'Обединеното Кралство е лидер в европейската програма за разрастване на възобновимите източници и да надмине ядрената енергетика в производството на електроенергия.',
        en: 'UK leads European solar energy expansion to help renewables overtake output of nuclear power as industry leaders hail ‘tipping point’ for the technology'
      }
    },
    {
      image: 'images/slider/slide2.jpg',
      title: {
        en: 'South African team may have solved solar puzzle even Google couldn\'t crack',
        bg: 'Слънчевия пъзел който Гугъл не може да пребори може би е разрешен от екип от Южана Африка'
      },
      text: {
        en: 'Pioneering technology to deliver the cheapest, small-scale concentrated solar power plants in the world could revolutionise the renewable energy market',
        bg: 'Нова пилотна технология може да революционализира концентриращите соларни системи и да направи възможно генерирането на евтина електроенергия за дребния производител.'
      }
    },
    {
      image: 'images/slider/slide3.jpg',
      title: {
        en: 'The future is kite powered',
        bg: 'Бъдещето е захранено от хвърчила'
      },
      text: {
        en: 'Wind turbines are controversial. They are accused of being blots on the landscape, expensive to run and need good winds to work. But the critics could be silenced with a totally new way of generating wind power – using kites. This is a serious proposition. Power-generating kites are far more sophisticated',
        bg: 'Вятърните турбини са много чест с противоречиви характеристики. Те загрозяват пейзажа, скъпи са за потдръжка и имат нужда от стабилен вятър. Но критиците могат да бъдат оборени с тотално нов начин за генериране на вятърна електроергия чрез използване на хврърчила. Хвърчилата за генериране на електроенергия са далеч по сложни от нормалните турбини'
      }
    }
  ];
}

controllersModule.controller('SliderCtrl', SliderCtrl);
