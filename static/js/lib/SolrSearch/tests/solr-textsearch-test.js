/*global define, buster */
// ## solr-textsearch-test.js
// Author: Cormac McGuire
// Test that filters are displaying and dispatching filter events
// to our streams
define(
  [
    'lib/SolrSearch/TextSearch',
    'lib/streams'
  ],
  function(TextSearch , Streams) {
    'use strict';
    var assert = buster.assert,
        manager;
    buster.testCase('Solr Search ', {
      
      setUp: function() {
      },
      'should return the widget': function() {
        assert.equals(typeof(TextSearch), 'function');
       }

    });
    
  }
);


