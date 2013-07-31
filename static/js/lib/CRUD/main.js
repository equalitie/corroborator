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
        init = function() {
          var formManagerView = new FormManager.FormManagerView(),
          embeddedSearchView = new EmbeddedResultsManagerView();
        };
    return {
      init: init
    };

});

