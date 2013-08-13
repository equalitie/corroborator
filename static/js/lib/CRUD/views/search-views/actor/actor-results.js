/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/results',
    'lib/CRUD/views/search-views/actor/actor-result',
    'lib/CRUD/templates/search-templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, Results, ActorResult,
    embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        ActorResultsView,
        crudBus = Streams.crudBus,
        filterActorRejected = function(value) {
          return value.type === 'unrelate_actor_request';
        },
        mapContentToValue = function(value) {
          return value.content;
        },
        filterRelationshipResponse = function(value) {
          return value.type === 'actor_relationship_type_response';
        },
        filterActorResults = function(value) {
          return value.type === 'results_actor';
        };

    // ### ActorResultsView
    // Specific results view for displaying actors
    ActorResultsView = Backbone.View.extend({
      entityType: 'actor',
      // watch the event stream for new actors
      watchCrudStream: function() {
        console.log('watchCrudStream actors');
        this.watchForSearchResults();
        this.watchForRejectedActors();
      },

      // watch for actor models that get removed from the actor entity
      // and add them back to the list of available actors
      watchForRejectedActors: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterActorRejected)
                 .subscribe(this.addModelToCollection.bind(this));
        this.subscribers.push(subscriber);
      },

      addModelToCollection: function(evt) {
        var model = evt.value().content.model;
        var exists = this.collection.where({resource_uri: model.get('resource_uri')}).length;
        if (exists === 0) {
          this.collection.add(model);
        }

      },
      // watch for actor results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterActorResults)
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
      // called when collection listened to in superclass is updated
      // (results.js initialize)
      // TODO - change name to requestRenderResults
      renderResults: function() {
        this.requestRelationshipType();
      },

      reallyRenderResults: function() {
        this.destroyChildren();
        this.collection.each(this.renderResult, this);
      },

      requestRelationshipType: function() {
        var subscriber 
          = crudBus.toEventStream()
                   .filter(filterRelationshipResponse)
                   .map(mapContentToValue)
                   .subscribe(this.listenForRelationshipType.bind(this));
        this.subscribers.push(subscriber);
        crudBus.push({
          type: 'request_actor_relationship_type'
        });
      },

      listenForRelationshipType: function(evt) {
        this.fieldName = evt.value();
        this.reallyRenderResults();
      },

      // render a single result
      renderResult: function(model) {
        var resultView = new ActorResult({
          model: model,
          type: 'result',
          fieldName: this.fieldName,
          collection: this.collection
        });
        this.$el.children()
                .children()
                .children('ul')
                .append(resultView.$el);
      },
    });
    _.extend(ActorResultsView.prototype, EmbeddedSearchResultsView);
    
    return {
      ActorResultsView: ActorResultsView
    };
});

