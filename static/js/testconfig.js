require.config({
  baseUrl: 'lib',
  paths: {
    'lib':        '../lib',
    'jquery':     '//ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min',
    'jquery_ui':  '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js',
    'backbone':   '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
    'marionette': '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.1-bundled/backbone.marionette.min',
    'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'bacon':      '//cdnjs.cloudflare.com/ajax/libs/bacon.js/0.4.2/Bacon',
    'bacon_ui':   '../components/bacon-ui/Bacon.UI',
    'handlebars': '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.runtime.min'

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
