/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/results',
    'lib/CRUD/views/search-views/media/media-result',
    'lib/CRUD/templates/search-templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, Results, MediaResult,
    embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        MediaResultsView,
        crudBus = Streams.crudBus,
        filterMediaRejected = function(value) {
          return value.type === 'unrelate_media_request';
        },
        filterMediaResults = function(value) {
          return value.type === 'results_media';
        };

    // ### MediaResultsView
    // Specific results view for displaying medias
    MediaResultsView = Backbone.View.extend({
      entityType: 'media',
      // watch the event stream for new medias
      watchCrudStream: function() {
        console.log('watchCrudStream media');
        this.watchForSearchResults();
        this.watchForRejectedMedias();
      },

      watchForRejectedMedias: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterMediaRejected)
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
      // watch for media results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterMediaResults)
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
        console.log('renderResults');
        this.destroyChildren();
        this.collection.each(this.renderResult, this);
      },

      // render a single result
      renderResult: function(model, index) {
        var resultView = new MediaResult({
          model: model,
          type: 'result',
          index: index,
          collection: this.collection
        });
        this.$el.children()
                .children()
                .children('ul')
                .append(resultView.$el);
      },
    });

    _.extend(MediaResultsView.prototype, EmbeddedSearchResultsView);
    
    return {
      MediaResultsView: MediaResultsView
    };
});

