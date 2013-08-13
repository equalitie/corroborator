/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the list of related actors

define (
  [
    'backbone', 'underscore',
    'lib/Data/actor',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/actors/actor.tpl',
    'lib/CRUD/templates/display-templates/actors/actor-container.tpl'

  ],
  function (Backbone, _, Actor, CollectionViews, actorTmp, actorContainerTmp) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        ActorListView, ActorView,
        ActorModel = Actor.ActorModel;

    ActorView = ModelView.extend({
      tagName: 'li',
      className: 'REPEAT',
      template: actorTmp
    });

    // ### ActorListView
    // Display a list of actors
    ActorListView = ListLoadView.extend({
      modelType: ActorModel,
      childView: ActorView,
      childViews: [],
      fieldType: 'actors',
      containerTmp: actorContainerTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }
    });

    return ActorListView;
    
});
