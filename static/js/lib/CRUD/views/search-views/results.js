/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/actor-result',
    'lib/CRUD/templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, ActorResult,
    embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView,
        ActorResultsView,
        crudBus = Streams.crudBus,
        filterActorResults = function(value) {
          return value.type === 'results_actor';
        };
    // ### EmbeddedSearchResultsView
    // 
    EmbeddedSearchResultsView = Backbone.View.extend({
      events: {
        'click .do-hideResults': 'closeResults'
      },
      template: embeddedResultsTmp,
      className: 'overlay WIREFRAME',
      childViews: [],
      initialize: function() {
        this.render();
        this.watchCrudStream();
        this.collection = new Backbone.Collection();
        this.collection.on('change remove reset', this.renderResults, this);
      },

      closeResults: function() {
        crudBus.push({
          type: 'close_embedded_results',
          content: {}
        });
      },

      watchCrudStream: function() {},
      destroy: function() {
        this.collection.off('change reset', this.renderResults, this);
        this.$el.remove();
        this.undelegateEvents();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.$el.children()
                .children()
                .children('ul')
                .children()
                .remove();
      },
    });

    ActorResultsView = EmbeddedSearchResultsView.extend({
      entityType: 'actor',
      watchCrudStream: function() {
        var self = this;
        crudBus.filter(filterActorResults)
               .onValue(function(value) {
                 self.collection.reset(value.content);
               });
      },
      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
      },
      renderResults: function() {
        this.destroyChildren();
        this.collection.each(this.renderResult, this);
      },
      renderResult: function(model) {
        var resultView = new ActorResult({
          model: model,
          collection: this.collection
        });
        this.$el.children()
                .children()
                .children('ul')
                .append(resultView.$el);
      },
    });
    
    return {
      ActorResultsView: ActorResultsView
    };
});

