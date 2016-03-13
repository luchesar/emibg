'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function item($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
        element.removeAttr('item');
        var articleTemplate = '<flat-article></flat-article>';
        var eventTemplate = '<flat-event></flat-event>';
        if (scope.item.itemType === "article") {
            scope.article = scope.item;
            element.html(articleTemplate);
        } else if (scope.item.itemType === "event") {
            scope.event = scope.item;
            element.html(eventTemplate);
        }
        var compiled = $compile(element);
        compiled(scope);
    }
  };
}

directivesModule.directive('item', item);
