/*global requirejs, window */
(function(requirejs) {
  'use strict';
  var tests = [], file;
  for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (/Spec\.js$/.test(file)) {
        tests.push(file);
      }
    }
  }

  requirejs.config({
    baseUrl: '/base',
    'paths': {
      'lib'            : 'lib',
      'test'           : 'test',
      //'main'           : 'main',
      'i18n'           : 'components/requirejs-i18n/i18n',
      'jquery'         : 'components/jquery/jquery',
      'jasmine_jquery' : 'components/jasmine-jquery/lib/jasmine-jquery',
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
      'sinon'          : 'bower_components/sinonjs-built/pkg/sinon-1.7.3',
      // ajax solr stuff
      'core'           : 'components/ajax-solr/core',
      'managers'       : 'components/ajax-solr/managers',
      'widgets'        : 'components/ajax-solr/widgets',
    },
    shim: {
      underscore: {
        exports: '_'
      },
      sinon: {
        exports: 'sinon'
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

    },
    deps: tests,
    callback: window.__karma__.start
  });

  

}(requirejs));
