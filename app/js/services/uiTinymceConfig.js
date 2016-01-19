
'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function uiTinymceConfig() {
  return {
    onChange: function(e) {
      console.log("Editor changed");
    },
    inline: true,
    plugins : 'advlist autolink link image lists charmap print preview',
    skin: 'lightgray',
    theme : 'modern'
  };
}

servicesModule.service('uiTinymceConfig', uiTinymceConfig);

