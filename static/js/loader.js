/*global requirejs */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'lib':        'lib',
      'main':       'main',
      'jquery':     'components/jquery/jquery',
      'jquery_ui':  '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
      'backbone':   'components/backbone/backbone-min',
      'marionette': 'components/backbone.marionette/lib/backbone.marionette.min',
      'underscore': 'components/underscore/underscore-min',
      'handlebars': 'components/handlebars/handlebars.runtime',
      'bacon':      'components/baconjs/dist/Bacon',
      'bacon_ui':   'components/bacon-ui/Bacon.UI'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      marionette: {
        deps: ['backbone'],
        exports: 'Marionette'
      },
      handlebars: {
        exports: 'Handlebars'
      },
      bacon_ui: {
        deps: ['jquery', 'bacon'],
        exports: 'Bacon.UI'
      }

    }
  });
  requirejs(["main"]);
  

}(requirejs));
