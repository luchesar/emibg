'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function liquidCfg($timeout) {
  var resolve = function(path, obj, safe) {
    return path.split('.').reduce(function(prev, curr) {
        return !safe ? prev[curr] : (prev ? prev[curr] : undefined)
    }, obj || self)
  }  

  return {
    restrict: 'A',
    link: function (scope, element, attr) {
        $timeout(function () {
            var cfg = resolve(attr.liquidCfg, scope);
            element.imgLiquid(cfg);
        });
    }
  };
}

directivesModule.directive('liquidCfg', liquidCfg);
