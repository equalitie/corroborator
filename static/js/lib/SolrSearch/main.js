/*global window, document, define, Bootstrap */
'use strict';
define(
  [
    'lib/SolrSearch/widgets/manager',
    'lib/SolrSearch/views/header',
    'lib/SolrSearch/views/results',
    'lib/Data/collections'
  ],
  function(SolrManager, Header, Results, Collections) {
    var headerView;

    var init = function() {
      headerView = new Header.HeaderView();
      Results.init();
      SolrManager.doRequest();


    };
    return {
      init: init
    };
    
  }
);
