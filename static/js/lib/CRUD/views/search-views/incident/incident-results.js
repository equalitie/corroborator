/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/results',
    'lib/CRUD/views/search-views/incident/incident-result',
    'lib/CRUD/templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, Results, IncidentResult,
    embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        IncidentResultsView,
        crudBus = Streams.crudBus,
        filterIncidentRejected = function(value) {
          return value.type === 'unrelate_incident_request';
        },
        filterIncidentResults = function(value) {
          return value.type === 'results_incident';
        };

    // ### IncidentResultsView
    // Specific results view for displaying incidents
    IncidentResultsView = EmbeddedSearchResultsView.extend({
      entityType: 'incident',
      // watch the event stream for new incidents
      watchCrudStream: function() {
        this.watchForSearchResults();
        this.watchForRejectedIncidents();
      },

      watchForRejectedIncidents: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterIncidentRejected)
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
      // watch for incident results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterIncidentResults)
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
        var resultView = new IncidentResult({
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
      IncidentResultsView: IncidentResultsView
    };
});

