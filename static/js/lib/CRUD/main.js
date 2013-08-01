// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 
define (
  [
    'lib/CRUD/views/form-manager',
    'lib/CRUD/views/search-views/embedded-results-manager'
  ],
  function (FormManager, EmbeddedResultsManagerView) {
    'use strict';

    var formManagerView,
        embeddedSearchView,
        init = function() {
          formManagerView = new FormManager.FormManagerView();
          embeddedSearchView = new EmbeddedResultsManagerView();
        };
    return {
      init: init
    };

});

