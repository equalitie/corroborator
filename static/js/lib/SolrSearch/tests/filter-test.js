/*global define, buster */
// ## filter-test.js
// Author: Cormac McGuire
// Test that filters are displaying and dispatching filter events
// to our streams
define(
  [
    'jquery',
    'lib/SolrSearch/views/filters/filter-manager',
    'lib/SolrSearch/views/filters/actor-filters',
    'lib/SolrSearch/views/filters/incident-filters',
    'lib/SolrSearch/views/filters/bulletin-filters',
    'lib/streams'
  ],
  function($, FilterManager, ActorFilters, IncidentFilters, BulletinFilters, Streams) {
    'use strict';
    var assert = buster.assert,
        manager;
    buster.testCase('Filter views ', {
      
      setUp: function() {
        manager = new FilterManager.FilterManagerView();
      },
      'should return the three views': function() {
        assert.equals(typeof(ActorFilters.ActorFilterView), 'function');
        assert.equals(typeof(BulletinFilters.BulletinFilterView), 'function');
        assert.equals(typeof(IncidentFilters.IncidentFilterView), 'function');
        assert.equals(typeof(FilterManager.FilterManagerView), 'function');
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

