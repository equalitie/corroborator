/*global window, document, define */
define(
  [
    'lib/Navigation/main',
    'lib/SolrSearch/main',
  ],
  function(Navigation, SolrSearch) {
    'use strict';
    SolrSearch.init();
    Navigation.init();
  }
);

