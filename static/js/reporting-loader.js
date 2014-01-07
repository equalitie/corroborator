/*global requirejs, Bootstrap */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'i18n'           : 'components/requirejs-i18n/i18n',
      'lib'            : 'lib',
      'jquery'         : 'components/jquery/jquery',
      'jquery_ui'      : 'components/jquery.ui/dist/jquery-ui',
      'jquery_time'    : 'components/jquery-timepicker-addon/jquery-ui-timepicker-addon',
      'backbone'       : 'components/backbone/backbone',
      'bacon'          : 'components/bacon/dist/Bacon',
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
      },
      jquery_time: {
        deps: ['jquery', 'jquery_ui']
      }

    },
    config: {
      i18n: {
        locale: Bootstrap.locale || 'en'
      }
    }
  });
  requirejs(['lib/reporting/main']);
  

}(requirejs));
