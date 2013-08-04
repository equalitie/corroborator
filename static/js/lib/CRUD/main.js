// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 
define (
  [
    'lib/CRUD/views/form-manager',
    'lib/CRUD/views/display-views/display-view-manager',
    'lib/CRUD/views/search-views/embedded-results-manager'
  ],
  function (FormManager, EmbeddedResultsManagerView, DisplayManagerView) {
    'use strict';

    var formManagerView,
        embeddedSearchView,
        displayManagerView,
        init = function() {
          formManagerView = new FormManager.FormManagerView();
          embeddedSearchView = new EmbeddedResultsManagerView();
          displayManagerView = new DisplayManagerView();
        };
    return {
      init: init
    };

});

