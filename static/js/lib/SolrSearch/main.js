/*global window, document, define, Bootstrap */
define(
  [
    'lib/SolrSearch/widgets/manager',
    'lib/SolrSearch/views/header',
    'lib/SolrSearch/views/results',
    'lib/SolrSearch/views/filters',
    'lib/Data/collections'
  ],
  function(SolrManager, Header, Results, Filters, Collections) {
    'use strict';
    var headerView,
        filterManager;

    var init = function() {
      headerView = new Header.HeaderView();
      filterManager = new Filters.FilterManagerView();
      Results.init();
      SolrManager.doRequest();


    };
    return {
      init: init
    };
    
  }
);
