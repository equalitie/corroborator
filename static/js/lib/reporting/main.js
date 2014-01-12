/*global require*/
// Author: Cormac McGuire
// ### Entry point for the reporting application
// 

define(
  [
    'backbone',
    'lib/reporting/router/router',
    'lib/SolrSearch/solr/reporting-manager',
    'lib/reporting/views/tab-view',
    'lib/reporting/views/graph-type-select-view',
    'lib/reporting/views/graph-view',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/solr/search-reloader',
    'lib/elements/helpers/view-close',
    'jquery',
    'jquery_ui',
    'jquery_time'
  ],
  function(Backbone, Router, SolrManager, TabView, GraphSelectorView, GraphView, FilterManager, SearchReloader) {
    'use strict';
    var tabView = new TabView({
          el: '#monitor-navigation'
        }),
        graphTypeSelectorView = new GraphSelectorView(),
        router = new Router(),
        filterManager = new FilterManager.FilterManagerView();

    SearchReloader.init();
    Backbone.history.start();
    
  
  }
);
