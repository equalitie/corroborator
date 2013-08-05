/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the actor element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/templates/display-templates/actor-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, actorDisplayTmp) {
    'use strict';

    var ActorDisplayView,
        crudBus = Streams.crudBus,
        actorCollection = Collections.ActorCollection;

    // ### ActorDisplayView
    // Display and actor and all its related fields
    ActorDisplayView = Backbone.View.extend({
      template: actorDisplayTmp,
      childViews: [],
      initialize: function(options) {
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = actorCollection.superCollection.get(
          options.entityDetails.id);
        this.render()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIndcidents();
      },
      onDestroy: function() {
        this.destroyChildren();
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
        //var relatedActors = this.model.get('re
        //if (this.get('
        return this;
      },
      renderRelatedBulletins: function() {
        return this;
      },
      renderRelatedIndcidents: function() {
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

