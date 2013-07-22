// Author: Cormac McGuire  
require.config({
  baseUrl: "lib",
  paths: {
    "lib"            : "../lib",
    "test"           : "../test",
    "jquery"         : "../components/jquery/jquery",
    "jquery_ui"      : "../components/jquery.ui/dist/jquery-ui",
    "leaflet"        : "../components/leaflet/dist/leaflet",
    "backbone"       : "../components/backbone/backbone",
    "underscore"     : "../components/underscore/underscore",
    "bacon"          : "../components/bacon/dist/Bacon",
    "moment"         : "../components/moment/moment",
    "bacon_ui"       : "../components/bacon-ui/Bacon.UI",
    "handlebars"     : "../components/handlebars/handlebars.runtime",
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
        deps: ['jquery'],
      },
      bacon_ui: {
        deps: ['bacon', 'jquery']
      },
      jquery_ui: {
        deps: ['jquery']
      },

    
  }
});
