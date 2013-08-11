/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the actor element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/templates/display-templates/actor-display.tpl',
    'lib/CRUD/templates/display-templates/actors/expanded-actor-display.tpl',
  ],
  function (Backbone, _, Collections, Streams, ActorListView, 
    actorDisplayTmp, expandedActorDisplayTmp) {
    'use strict';

    var ActorDisplayView,
        crudBus = Streams.crudBus,
        actorCollection = Collections.ActorCollection;

    // ### ActorDisplayView
    // Display and actor and all its related fields
    ActorDisplayView = Backbone.View.extend({
      template: actorDisplayTmp,
      childViews: [],
      expanded: false,
      initialize: function(options) {
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = actorCollection.superCollection.get(
          options.entityDetails.id);
        this.on('expand', this.toggleExpanded, this);
        this.displayView();
      },

      // set the small template
      displayView: function() {
        this.render()
            .renderRelatedActors();
      },

      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },

      toggleExpanded: function() {
        if (this.expanded === true) {
          this.template = actorDisplayTmp;
          this.$el.removeClass('span-60p');
          this.displayView();
          this.expanded = false;
        }
        else {
          this.$el.addClass('span-60p');
          this.displayView();
          this.expanded = true;
        }
      },
      requestEdit: function() {
        crudBus.push({
          type: 'edit_actor_request',
          content: {
            model: this.model
          }
        });
      },

      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      renderRelatedActors: function() {
        var actorsEl = this.$el.children()
                               .children('.body')
                               .children('.actors'),

            content = this.model.get('actors_role');
        return this;
      },
      render: function() {
        this.destroyChildren();
        var html = this.template({
          model: this.model.toJSON()
        });
        this.$el.html(html);
        return this;
      }
    });

    return ActorDisplayView;
    
});

