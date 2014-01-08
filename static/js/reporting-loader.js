/*global requirejs, Bootstrap */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'i18n'           : 'components/requirejs-i18n/i18n',
      'lib'            : 'lib',
      'leaflet'        : 'components/leaflet/dist/leaflet',
      'jquery'         : 'components/jquery/jquery',
      'jquery_ui'      : 'components/jquery.ui/dist/jquery-ui',
      'jquery_time'    : 'components/jquery-timepicker-addon/jquery-ui-timepicker-addon',
      'backbone'       : 'components/backbone/backbone',
      'bacon'          : 'components/bacon/dist/Bacon',
      'moment'         : 'components/moment/moment',
      'underscore'     : 'components/underscore/underscore',
      'handlebars'     : 'components/handlebars/handlebars',
      'd3'             : 'bower_components/d3/d3',
      'nv'           : 'bower_components/nvd3/nv.d3',
      // ajax solr stuff
      'core'           : 'components/ajax-solr/core',
      'managers'       : 'components/ajax-solr/managers',
      'widgets'        : 'components/ajax-solr/widgets'
    },
    shim: {
      d3: {
        exports: 'd3'
      },
      nv: {
        deps: ['d3'],
        exports: 'nv'
      },
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
