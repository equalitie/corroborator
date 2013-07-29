// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 
define (
  [
    'lib/CRUD/views/form-manager',
    'lib/SolrSearch/solr/manager'
  ],
  function (FormManager, Manager) {
    'use strict';

    var formManagerView,
        init = function() {
          formManagerView = new FormManager.FormManagerView();
        };
    return {
      init: init
    };

});

