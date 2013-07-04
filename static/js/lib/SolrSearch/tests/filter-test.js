/*global define, buster */
// ## filter-test.js
// Author: Cormac McGuire
// Test that filters are displaying and dispatching filter events
// to our streams
define(
  [
    'jquery',
    'lib/SolrSearch/views/filters',
    'lib/streams'
  ],
  function($, Filters, Streams) {
    'use strict';
    var assert = buster.assert,
        manager;
    buster.testCase('Filter views ', {
      
      setUp: function() {
        manager = new Filters.FilterManagerView();
      },
      'should return the three views': function() {
        assert.equals(typeof(Filters.ActorFilterView), 'function');
        assert.equals(typeof(Filters.BulletinFilterView), 'function');
        assert.equals(typeof(Filters.IncidentFilterView), 'function');
        assert.equals(typeof(Filters.FilterManagerView), 'function');
       },
      'should create a view when the user navigates': function() {
        assert.equals(typeof(manager.currentView), 'undefined');
        Streams.navBus.push('actor');
        assert.equals(typeof(manager.currentView), 'object');
      },
      'should render actor filters when the user navigates to actors':
      function() {
        Streams.navBus.push('actor');
        var actorFilterAdded = $('.actor-display');
        assert.equals(actorFilterAdded.length, 1);
      },
      'should render incident filters when the user navigates to incidents': 
      function() {
          Streams.navBus.push('incident');
          var actorFilterAdded = $('.incident-display');
          assert.equals(actorFilterAdded.length, 1);
      },
      'should render bulletin filters when the user navigates to bulletins':
      function() {
        Streams.navBus.push('bulletin');
        var actorFilterAdded = $('.bulletin-display');
        assert.equals(actorFilterAdded.length, 1);
      }


    });
    
  }
);

