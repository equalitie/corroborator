/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/search-views/results',
    'lib/CRUD/views/search-views/bulletin/bulletin-result',
    'lib/CRUD/templates/search-templates/embedded-results.tpl'
  ],
  function (Backbone, _, Streams, Results, BulletinResult,
    embeddedResultsTmp) {
    'use strict';
    var EmbeddedSearchResultsView = Results.EmbeddedSearchResultsView,
        BulletinResultsView,
        crudBus = Streams.crudBus,
        filterBulletinRejected = function(value) {
          return value.type === 'unrelate_bulletin_request';
        },
        filterBulletinResults = function(value) {
          return value.type === 'results_bulletin';
        };

    // ### BulletinResultsView
    // Specific results view for displaying bulletins
    BulletinResultsView = Backbone.View.extend({
      entityType: 'bulletin',
      // watch the event stream for new bulletins
      watchCrudStream: function() {
        this.watchForSearchResults();
        this.watchForRejectedBulletins();
      },

      watchForRejectedBulletins: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterBulletinRejected)
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
      // watch for bulletin results and set the collection to them when they arrive
      watchForSearchResults: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterBulletinResults)
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
        var resultView = new BulletinResult({
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
    _.extend(BulletinResultsView.prototype, EmbeddedSearchResultsView);
    return {
      BulletinResultsView: BulletinResultsView
    };
});

