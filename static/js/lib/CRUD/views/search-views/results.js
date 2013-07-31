/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView,
        crudBus = Streams.crudBus;
    // ### EmbeddedSearchResultsView
    // 
    EmbeddedSearchResultsView = Backbone.View.extend({
      events: {
        'click .do-hideResults': 'closeResults'
      },
      template: embeddedResultsTmp,
      className: 'overlay WIREFRAME',
      childViews: [],

      // store a list of stream subscribers
      subscribers: [],
      initialize: function() {
        console.log('initialize EmbeddedSearchResultsView', this);
        this.render();
        this.watchCrudStream();
        this.collection = new Backbone.Collection();
        this.collection.on('add remove reset', this.renderResults, this);
      },

      // trigger event notifying of embedded reults close request
      closeResults: function() {
        crudBus.push({
          type: 'close_embedded_results',
          content: {}
        });
      },

      watchCrudStream: function() {},

      // destroy this view
      destroy: function() {
        this.collection.off('add change remove reset', this.renderResults, this);
        this.destroyChildren();
        this.$el.remove();
        this.undelegateEvents();
      },

      // ask all child views to destroy
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.$el.children()
                .children()
                .children('ul')
                .empty();
      },
      resetCollection: function(evt) {
        this.collection.reset(evt.value().content);
      }
    });

    
    return {
      EmbeddedSearchResultsView: EmbeddedSearchResultsView
    };
});

