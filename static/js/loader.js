/*global requirejs */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'lib'            : 'lib',
      'main'           : 'main',
      'jquery'         : 'components/jquery/jquery',
      'jquery_ui'      : 'components/jquery.ui/dist/jquery-ui',
      'jquery_form'    : 'components/jquery-form/jquery.form',
      'jquery_time'    : 'components/jquery-timepicker-addon/jquery-ui-timepicker-addon',
      'jquery_slider'  : 'components/jquery-timepicker-addon/jquery-ui-sliderAccess',
      'leaflet'        : 'components/leaflet/dist/leaflet',
      'backbone'       : 'components/backbone/backbone',
      'moment'         : 'components/moment/moment',
      'underscore'     : 'components/underscore/underscore',
      'handlebars'     : 'components/handlebars/handlebars',
      'bacon'          : 'components/bacon/dist/Bacon',
      'bacon_ui'       : 'components/bacon-ui/Bacon.UI',
      'spin'           : 'components/spin.js/spin',
      'flowplayer'     : 'components/flowplayer/dist/flowplayer',
      // ajax solr stuff
      'core'           : 'components/ajax-solr/core',
      'managers'       : 'components/ajax-solr/managers',
      'widgets'        : 'components/ajax-solr/widgets',
      'yadda'          : 'node_modules/yadda/dist/yadda-0.4.7'
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
      bacon: {
        deps: ['jquery']
      },
      bacon_ui: {
        deps: ['bacon', 'jquery']
      },
      core: {
        deps: ['jquery'],
      },
      widgets: {
        deps: ['jquery'],
      },
      jquery_ui: {
        deps: ['jquery']
      },
      jquery_form: {
        deps: ['jquery']
      },
      jquery_time: {
        deps: ['jquery', 'jquery_ui']
      },
      jquery_slider: {
        deps: ['jquery', 'jquery_ui', 'jquery_time']
      },
      flowplayer: {
        deps: ['jquery']
      }

    }
  });
  requirejs(['main']);
  

}(requirejs));
