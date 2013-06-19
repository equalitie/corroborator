/*global define, Bootstrap */
/**
### TabRouter

handle tab presses

*/
define(
  [
    'backbone',
    'lib/dispatcher'
  ],
  function(Backbone, dispatcher) {
    'use strict';
    var tabRouter;
    var TabRouter = Backbone.Router.extend({
      routes: {
        'tab/:section': 'openSection'
      },
      openSection: function(section) {
        dispatcher.trigger('navigate_' + section);
      }
    });

    var init = function() {
      tabRouter = new TabRouter();
      Backbone.history.start();
      return tabRouter;
    };

    return {
      init: init
    };
  }
);
