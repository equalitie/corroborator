// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 
define (
  [
    'lib/CRUD/views/form-manager'
  ],
  function (FormManager) {
    'use strict';

    var formManagerView,
        init = function() {
          formManagerView = new FormManager.FormManagerView();
        };
    return {
      init: init
    };

});

