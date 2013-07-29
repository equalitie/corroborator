/*global window, document, define */
define(
  [
    'lib/Navigation/main',
    'lib/SolrSearch/main',
    'lib/CRUD/main',
    'jquery',
    'jquery_ui',
    'jquery_time',
    'jquery_slider'
  ],
  function(Navigation, SolrSearch, CRUD, $) {
    'use strict';
    SolrSearch.init();
    CRUD.init();
    Navigation.init();
  }
);

