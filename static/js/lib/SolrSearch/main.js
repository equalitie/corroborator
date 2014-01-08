/*global window, document, define, Bootstrap */
define(
  [
    'underscore',
    'lib/SolrSearch/solr/manager',
    'lib/SolrSearch/solr/search-reloader',
    'lib/SolrSearch/views/header',
    'lib/SolrSearch/views/results',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/persist/search-saver',
    'lib/SolrSearch/persist/save-search-dialog',
    'lib/SolrSearch/persist/apply-saved-search'
  ],
  function(_, SolrManager, SearchReloader, Header, Results, FilterManager,
    SearchDetailFinder, SaveDialog, SavedSearchLoader) {
    'use strict';
    var headerView,
        searchDetailFinder,
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
      SearchReloader.init(true);

      // start a watcher for save search requests
      searchDetailFinder = new SearchDetailFinder();
      searchDetailFinder.init();

      // create a watcher to open a dialog for search requests
      SaveDialog.init();

      // create a watcher to load saved searches on request
      SavedSearchLoader.init();
    };
    return {
      init: init
    };
    
  }
);
