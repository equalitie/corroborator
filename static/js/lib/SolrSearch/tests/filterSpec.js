/*global jasmine, describe, beforeEach, xit, it, expect */
// ## filterSpec.js
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
    'lib/streams',
    'test/fixtures/extensions'
  ],
  function($, FilterManager, ActorFilters, IncidentFilters, BulletinFilters, Streams) {
    'use strict';
    var manager;
      var navigate = function(entity) {
        Streams.navBus.push({
          type: 'navigate',
          content: {
            entity: entity
          }
        });
      };
      describe('', function () {
        //var 
      
      beforeEach( function() {
        manager = new FilterManager.FilterManagerView();
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load('test/fixtures/base.html');
      });

      it('should return the three views', function() {
        expect(typeof(ActorFilters.ActorFilterView)).toEqual('function');
        expect(typeof(BulletinFilters.BulletinFilterView)).toEqual('function');
        expect(typeof(IncidentFilters.IncidentFilterView)).toEqual('function');
        expect(typeof(FilterManager.FilterManagerView)).toEqual('function');
      });

      it('should create a view when the user navigates', function() {
        expect(typeof(manager.currentView)).toEqual('undefined');
        navigate('actor');
        expect(typeof(manager.currentView)).toEqual('object');
      });
      it('should render actor filters container when the user navigates to actors', function() {
        navigate('actor');
        var actorFilterAdded = $('.actor-display');
        expect(actorFilterAdded.length).toEqual(1);
      });
      it('should render incident filters when the user navigates to incidents', function() {
        navigate('incident');
        var actorFilterAdded = $('.incident-display');
        expect(actorFilterAdded.length).toEqual(1);
      });
      it('should render bulletin filters when the user navigates to bulletins', function() {
        navigate('bulletin');
        var actorFilterAdded = $('.bulletin-display');
        expect(actorFilterAdded.length).toEqual(1);
      });


    });
    
  }
);

