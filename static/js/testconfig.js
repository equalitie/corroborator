// Author: Cormac McGuire  
require.config({
  baseUrl: "lib",
  paths: {
    "lib"            : "../lib",
    "test"           : "../test",
    "jquery"         : "../components/jquery/jquery",
    "jquery_ui"      : "../components/jquery.ui/dist/jquery-ui",
    "jquery_form"    : "../components/jquery-form/jquery.form",
    "jquery_time"    : "../components/jquery-timepicker-addon/jquery-ui-timepicker-addon",
    "jquery_slider"  : "../components/jquery-timepicker-addon/jquery-ui-sliderAccess",
    "leaflet"        : "../components/leaflet/dist/leaflet-src",
    "backbone"       : "../components/backbone/backbone",
    "moment"         : "../components/moment/moment",
    "underscore"     : "../components/underscore/underscore",
    "handlebars"     : "../components/handlebars/handlebars.runtime",
    "bacon"          : "//cdnjs.cloudflare.com/ajax/libs/bacon.js/0.6.1/Bacon",
    "spin"           : "../components/spin.js/spin",
    "flowplayer"     : "../components/flowplayer/dist/flowplayer",
    // ajax solr stuff
    "core"           : "../components/ajax-solr/core",
    "managers"       : "../components/ajax-solr/managers",
    "widgets"        : "../components/ajax-solr/widgets"
  },
  shim: {
      underscore: {
        exports: "_"
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      handlebars: {
        exports: "Handlebars"
      },
      bacon: {
        deps: ["jquery"],
        exports: "Bacon"
      },
      bacon_ui: {
        deps: ["bacon", "jquery"]
      },
      core: {
        deps: ['jquery'],
      },
      widgets: {
        deps: ['jquery'],
      },
      jquery_ui: {
        deps: ["jquery"]
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
