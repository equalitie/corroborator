/*global require*/
// Author: Cormac McGuire
// ### Entry point for the reporting application
// 

define(
  [
    'backbone',
    'lib/reporting/router/router',
    'lib/reporting/views/tab-view'
  ],
  function(Backbone, Router, TabView) {
    'use strict';
    var tabView = new TabView({
          el: '#monitor-navigation'
        }),
        router = new Router();
    Backbone.history.start();
    
  
  }
);
