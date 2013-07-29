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
        crudBus = Streams.crudBus,
        filterActorRelateRequest = function(value) {
          return value.type === 'relate_actor_request';
        };

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
          this.collection.on('add remove', this.renderActors, this);
        }
        this.listenForActorsAdded();
        this.render();
        this.renderActors();
      },

      // turn off event listeners and remove dom elements
      destroy: function() {
        this.collection.off('add remove', this.renderActors, this);
        this.$el.remove();
        this.undelegateEvents();
      },

      // user clicked search
      searchActorsRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_search',
          content: {
            raw: inputText
          }
        });
        // 
        crudBus.push({
          type: 'actor-results',
          content: {}
        });
      },
      listenForActorsAdded: function() {
        crudBus.filter(filterActorRelateRequest)
               .onValue(function() {
               });
      },

      // render the list of related actors
      renderActors: function() {
      },

      //render the input field and buttons
      render: function() {
        var html = this.template();
        this.$el.empty()
                .append(html);
      }
    });

    return ActorSearchView;
    
});



