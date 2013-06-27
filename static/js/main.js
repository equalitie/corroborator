/*global window, document, define */
'use strict';
define(
  [
    'lib/Navigation/main',
    'lib/SolrSearch/main',
  ],
  function(Navigation, SolrSearch) {
    SolrSearch.init();
    Navigation.init();
  }
);

