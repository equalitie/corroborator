/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for actors, provide display of selected actors and select element
// to store them for the containing form

define (
  [
    'jquery', 'backbone', 'lib/streams',
    'lib/elements/select-option',
    'lib/CRUD/templates/actor-search-field.tpl'
  ],
  function ($, Backbone, Streams, SelectOptionView, 
    actorSearchTmp) {
    'use strict';
    var ActorSearchView,
        crudBus = Streams.crudBus;

    // ### ActorSearchView
    // Search for actors and display actors already associated with and entity
    // allows for adding of search results
    ActorSearchView = Backbone.View.extend({
      events: {
        'click .do-search': 'searchActorsRequested'
      },
      template: actorSearchTmp,
      // constructor
      // pass in collection of existing Actors related to this entity
      // or create a new one
      initialize: function() {
        if (this.collection === undefined) {
          this.collection = new Backbone.Collection();
        }
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      searchActorsRequested: function(evt) {
        evt.preventDefault();
        var inputText = this.$el.children('.search').children('input').val();
        crudBus.push({
          type: 'new_search',
          content: {
            raw: inputText
          }
        });
        console.log('searchActorsRequested');
      },
      render: function() {
        var html = this.template();
        this.$el.empty()
                .append(html);
      }
    });

    return ActorSearchView;
    
});



