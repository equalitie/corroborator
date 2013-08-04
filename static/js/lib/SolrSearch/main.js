/*global window, document, define, Bootstrap */
define(
  [
    'underscore',
    'lib/SolrSearch/solr/manager',
    'lib/SolrSearch/views/header',
    'lib/SolrSearch/views/results',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/data/filter-collections',
    'lib/Data/collections'
  ],
  function(_, SolrManager, Header, Results, FilterManager, FilterCollection, Collections) {
    'use strict';
    var headerView,
        filterManager;

    var init = function() {
      // Display Results header and sort links
      headerView = new Header.HeaderView();
      // Display filters
      filterManager = new FilterManager.FilterManagerView();
      // Display results
      Results.init();
      // Do initial solr request
      // pass the callback to ensure that the initial request has been
      // done before anything else gets started
      SolrManager.MainManager.doRequest();
      
    };
    return {
      init: init
    };
    
  }
);
