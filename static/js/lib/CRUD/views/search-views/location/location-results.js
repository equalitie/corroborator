/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/results',
    'lib/CRUD/views/search-views/location/location-result',
    'lib/CRUD/templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, Results, LocationResult,
    embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        LocationResultsView,
        crudBus = Streams.crudBus,
        filterLocationRejected = function(value) {
          return value.type === 'unrelate_location_request';
        },
        filterLocationResults = function(value) {
          return value.type === 'results_location';
        };

    // ### LocationResultsView
    // Specific results view for displaying locations
    LocationResultsView = EmbeddedSearchResultsView.extend({
      entityType: 'location',
      // watch the event stream for new locations
      watchCrudStream: function() {
        this.watchForSearchResults();
        this.watchForRejectedLocations();
      },

      watchForRejectedLocations: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterLocationRejected)
                 .subscribe(this.addModelToCollection.bind(this));
        this.subscribers.push(subscriber);
      },
      addModelToCollection: function(evt) {
        console.log('addModelToCollection', evt.value().content.model);
        var model = evt.value().content.model;
        var exists = this.collection.where({resource_uri: model.get('resource_uri')}).length;
        if (exists === 0) {
          this.collection.add(model);
        }

      },
      // watch for location results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterLocationResults)
                 .subscribe(this.resetCollection.bind(this));
        this.subscribers.push(subscriber);
      },

      // render a container to hold the results
      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
      },

      // render the search results
      renderResults: function() {
        this.destroyChildren();
        this.collection.each(this.renderResult, this);
      },

      // render a single result
      renderResult: function(model) {
        var resultView = new LocationResult({
          model: model,
          type: 'result',
          collection: this.collection
        });
        this.$el.children()
                .children()
                .children('ul')
                .append(resultView.$el);
      },
    });
    
    return {
      LocationResultsView: LocationResultsView
    };
});
