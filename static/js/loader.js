/*global requirejs */
(function(requirejs) {
  'use strict';
  requirejs.config({
    'paths': {
      'lib'            : 'lib',
      'main'           : 'main',
      'jquery'         : 'components/jquery/jquery',
      'jquery_ui'      : 'components/jquery.ui/dist/jquery-ui-1.10.3.custom.min',
      'backbone'       : 'components/backbone/backbone-min',
      'marionette'     : 'components/backbone.marionette/lib/backbone.marionette.min',
      'underscore'     : 'components/underscore/underscore-min',
      'handlebars'     : 'components/handlebars/handlebars',
      'bacon'          : 'components/baconjs/dist/Bacon',
      'bacon_ui'       : 'components/bacon-ui/Bacon.UI',
      // ajax solr stuff
      'core'           : 'components/ajax-solr/core',
      'managers'       : 'components/ajax-solr/managers',
      'widgets'        : 'components/ajax-solr/widgets',
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
      
      bacon: {
        deps: ['jquery']
      },
      core: {
        deps: ['jquery'],
      },
      widgets: {
        deps: ['jquery'],
      },
      jquery_ui: {
        deps: ['jquery']
      }

    }
  });
  requirejs(['main']);
  

}(requirejs));
