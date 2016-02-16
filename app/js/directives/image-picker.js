'use strict';

var directivesModule = require('./_index.js');
var moment = require('moment');

/**
 * @ngInject
 */
function imagePicker($compile) {
  return {
    restrict: 'E',
    templateUrl: 'admin/image-picker.html',
    link: function(scope, element, attributes) {
      var imageObjStr = element.attr('image') || "image";
      scope.$$$width = element.attr('width') || "400px";
      scope.$$$height = element.attr('height') || "300px";
      scope.$watch(imageObjStr + ".url", function() {
        console.log("image changed");
        var imageObj = scope.$eval(imageObjStr);
        if (!imageObj.url) {
          imageObj.url = "https://placeholdit.imgix.net/~text?txtsize=33&txt=Изберете Изображение&w=400&h=300"
        }
        scope.$$$imagePickerImage = imageObj;
        element.find('*').off();
        $compile(element.contents())(scope);
      });

      scope.onPicked = function(docs) {
        var imageObj = scope.$eval(imageObjStr);
        var imageInfo = docs.shift();
        imageObj.config ={
          fill: true,
          horizontalAlign: "center",
          verticalAlign: "center"
        }
        imageObj.url = "http://drive.google.com/uc?export=view&id=" + imageInfo.id;
        scope.$$$imagePickerImage = imageObj;
        element.find('*').off();
        $compile(element.contents())(scope);
      }
    }
  };
}

directivesModule.directive('imagePicker', imagePicker);
