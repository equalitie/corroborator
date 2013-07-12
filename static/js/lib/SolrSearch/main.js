/*global window, document, define, Bootstrap */
define(
  [
    'lib/SolrSearch/solr/manager',
    'lib/SolrSearch/views/header',
    'lib/SolrSearch/views/results',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/data/filter-collections',
    'lib/Data/collections'
  ],
  function(SolrManager, Header, Results, FilterManager, FilterCollection, Collections) {
    'use strict';
    var headerView,
        filterManager;

    var init = function() {
      // Display Results header and sort links
      headerView = new Header.HeaderView();
      // Display filers
      filterManager = new FilterManager.FilterManagerView();
      // Display results
      Results.init();
      // Do initial solr request
      SolrManager.MainManager.doRequest();
    };
    return {
      init: init
    };
    
  }
);
