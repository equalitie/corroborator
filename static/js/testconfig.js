// Author: Cormac McGuire  
require.config({
  baseUrl: "lib",
  paths: {
    "lib"            : "../lib",
    "test"           : "../test",
    "jquery"         : "../components/jquery/jquery",
    "jquery_ui"      : "../components/jquery.ui/dist/jquery-ui",
    "leaflet"        : "../components/leaflet/dist/leaflet-src",
    "backbone"       : "../components/backbone/backbone",
    "underscore"     : "../components/underscore/underscore",
    "moment"         : "../components/moment/moment",
    "handlebars"     : "../components/handlebars/handlebars.runtime",
    "bacon"          : "//cdnjs.cloudflare.com/ajax/libs/bacon.js/0.6.1/Bacon"
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
        exports: 'Bacon'
      },
      bacon_ui: {
        deps: ['bacon', 'jquery']
      },
      jquery_ui: {
        deps: ['jquery']
      },

    
  }
});
