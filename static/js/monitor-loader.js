/*global requirejs, Bootstrap */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'i18n'           : 'components/requirejs-i18n/i18n',
      'lib'            : 'lib',
      'jquery'         : 'components/jquery/jquery',
      'jquery_ui'      : 'components/jquery.ui/dist/jquery-ui',
      'backbone'       : 'components/backbone/backbone',
      'moment'         : 'components/moment/moment',
      'underscore'     : 'components/underscore/underscore',
      'handlebars'     : 'components/handlebars/handlebars',
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      handlebars: {
        exports: 'Handlebars'
      },
      jquery_ui: {
        deps: ['jquery']
      }

    },
    config: {
      i18n: {
        locale: Bootstrap.locale || 'en'
      }
    }
  });
  requirejs(['lib/monitor/main']);
  

}(requirejs));
