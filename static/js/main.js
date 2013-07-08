/*global window, document, define */
define(
  [
    'lib/Navigation/main',
    'lib/SolrSearch/main',
    'lib/CRUD/main'
  ],
  function(Navigation, SolrSearch, CRUD) {
    'use strict';
    SolrSearch.init();
    CRUD.init();
    Navigation.init();
  }
);

