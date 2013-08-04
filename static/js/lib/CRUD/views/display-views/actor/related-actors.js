/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a list of actors related to the current actor

define (
  [
    'backbone', 'underscore',
    'lib/CRUD/templates/display-templates/actor-result.tpl'
  ],
  function (Backbone, _) {
    'use strict';
    var RelatedActorsView;

    // ### RelatedActorsView
    // Show a list of related actors
    RelatedActorsView = Backbone.View.extend({
      tagName: 'ul',
      className: '',
      childViews: [],
      initialize: function() {
        this.render();
      },
      onDestroy: function() {
        this.destroyChildren();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
      },
      render: function() {
        this.collection.each(this.renderActor, this);
      },
      renderActor: function(model) {
        var actorView = new ActorView({
          model: model
        });
        this.$el.append(actorView.$el);
        this.childViews.push(actorView);
      }
    });

    return RelatedActorsView;
    
});

