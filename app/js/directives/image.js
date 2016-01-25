'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function emiImage($compile) {
  return {
    restrict: 'E',
    templateUrl: 'fragments/image.html',
    link: function(scope, element, attributes) {
      var imageObjStr = element.attr('image') || "image";
      var width = element.attr('width');
      var height = element.attr('height');
      var widthStr = width ? "width:" + width + ";" : "";
      var heightStr = height ? "height:" + height + ";" : "";
      var liquidContainer = element.find('.img-thumbnail');
      liquidContainer.attr("style", widthStr + heightStr);

      var onChange = function() {
        console.log("image changed");
        var imageObj = scope.$eval(imageObjStr);
        if (imageObj) {
          scope.$$$imagePickerImage = imageObj;
          $compile(element.contents())(scope);
        }
      }
      scope.$watch(imageObjStr + ".url", onChange);
      scope.$watch(imageObjStr + ".config", onChange);
    }
  };
}

directivesModule.directive('emiImage', emiImage);
