/*global require*/
// Author: Cormac McGuire
// ### Entry point for the reporting application
// 

define(
  [
    'backbone',
    'lib/reporting/router/router',
    'lib/reporting/views/tab-view',
    'lib/reporting/views/graph-type-select-view',
    'lib/reporting/views/graph-view',
    'lib/elements/helpers/view-close'
  ],
  function(Backbone, Router, TabView, GraphSelectorView) {
    'use strict';
    var tabView = new TabView({
          el: '#monitor-navigation'
        }),
        graphTypeSelectorView = new GraphSelectorView(),
        router = new Router();
    Backbone.history.start();
    
  
  }
);
