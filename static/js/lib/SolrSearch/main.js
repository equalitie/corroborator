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
      //FilterCollection.init();
      headerView = new Header.HeaderView();
      filterManager = new FilterManager.FilterManagerView();
      Results.init();
      SolrManager.MainManager.doRequest();


    };
    return {
      init: init
    };
    
  }
);
