/*global requirejs */
'use strict';
(function(requirejs) {
  requirejs.config({
    'paths': {
      'lib': 'lib',
      'main': 'main',
      'jquery': 'components/jquery/jquery',
      'jquery_ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
      'backbone': 'components/backbone/backbone-min',
      'marionette': 'components/backbone.marionette/lib/backbone.marionette.min',
      'underscore':'components/underscore/underscore-min',
      'handlebars': 'components/handlebars/handlebars.runtime'
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
      }
    }
  });
  requirejs(["main"]);
  

}(requirejs));
