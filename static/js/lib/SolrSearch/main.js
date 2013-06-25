/*global window, document, define, Bootstrap */
'use strict';
define(
  [
    'lib/SolrSearch/widgets/manager',
    'lib/SolrSearch/views/header',
  ],
  function(SolrManager, Header) {
    var headerView;

    var init = function() {
      headerView = new Header.HeaderView();

    };
    return {
      init: init
    };
    
  }
);
