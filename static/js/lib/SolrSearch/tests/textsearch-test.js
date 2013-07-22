/*global define, buster */
// ## solr-textsearch-test.js
// Author: Cormac McGuire
// Test that filters are displaying and dispatching filter events
// to our streams
define(
  [
    'underscore',
    'lib/SolrSearch/solr/parse-filters',
    'lib/streams',
    'test/fixtures/filters'
  ],
  function(_, ParseFilter, Streams, filters) {
    'use strict';
    var actorFields = [
          'age_en_exact',
          'sex_en_exact',
          'civilian_en_exact',
          'nationality_en_exact'
        ],
        bulletinFields = [
          'bulletin_labels_exact',
          'bulletin_assigned_exact',
          'most_recent_status_bulletin_exact',
          'sources_exact'
        ],
        incidentFields = [
          'incident_labels_exact', 
          'incident_assigned_exact',
          'crimes_exact',
          'most_recent_status_incident_exact'
        ],
        filterBulletin = function(value) {
          var isSame = 
            _.difference(bulletinFields, _.keys(value.content)).length === 0;
          return value.type === 'parse_filters_bulletin' && isSame;
        },
        filterIncident = function(value) {
          var isSame = 
            _.difference(incidentFields, _.keys(value.content)).length === 0;
          return value.type === 'parse_filters_incident' && isSame;
        },
        filterActor = function(value) {
          var isSame = 
            _.difference(actorFields, _.keys(value.content)).length === 0;
          return value.type === 'parse_filters_actor' && isSame;
        },

        bus = Streams.searchBus,
        assert = buster.assert,
        manager;
    buster.testCase('Solr Search result parser', {
      
      setUp: function() {
      },
      'should return the filter parser function': function() {
        assert.equals(typeof(ParseFilter), 'function');
      },
      'should parse the bulletin filters': function(done) {
        bus.toEventStream()
           .filter(filterBulletin)
           .take(1)
           .onValue(done(function(value) {
             assert.equals(true, true);
          
        }));
        var fp = new ParseFilter(filters, 'bulletin');
      },
      'should parse the incident filters': function(done) {
        bus.toEventStream()
           .filter(filterIncident)
           .take(1)
           .onValue(done(function(value) {
             assert.equals(true, true);
          
        }));
        var fp = new ParseFilter(filters, 'incident');
      },
      'should parse the actor filters': function(done) {
        bus.toEventStream()
           .filter(filterActor)
           .take(1)
           .onValue(done(function(value) {
             assert.equals(true, true);
          
        }));
        var fp = new ParseFilter(filters, 'actor');
      }

    });
    
  }
);


