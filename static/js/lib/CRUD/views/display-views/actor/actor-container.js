/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Show the list of related actors

define (
  [
    'backbone', 'underscore',
    'lib/Data/actor',
    'lib/Data/collections',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/actors/actor.tpl',
    'lib/CRUD/templates/display-templates/actors/actor-container.tpl'

  ],
  function (Backbone, _, Actor, Collections, CollectionViews,
    actorTmp, actorContainerTmp) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        ActorCollection = Collections.ActorCollection,
        ActorListView, ActorView,
        ActorModel = Actor.ActorModel;
    var buildUrlVars = function() {
      return "?format=json&username=" +
      Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
    };

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
      srcCollection: Collections.ActorCollection,

      // override the load from list function
      loadFromList: function (uriList, roleList) {
        this.createInitialModelData(uriList, roleList);
        this.collection.each(this.createDisplayModel, this);
        this.renderChildren();
      },

      // create models from the base role and uri actor data
      createInitialModelData: function(uriList, roleList) {
        var i = 0;
        if (_.isArray(uriList) && _.isArray(roleList)) {
          for (i=0 ; i<uriList.length; i++) {
            var model = new Backbone.Model({
              uri: uriList[i],
              role: roleList[i],
              id: i,
            });
            model.url = uriList[i] + buildUrlVars();
            this.collection.add(model);
          }
        }
      },

      // populate the rest of the actor data, from the collection if possible
      // or fall back to an api call
      createDisplayModel: function(model, index, list) {
        var actorDetails = this.loadFromCollection(model.get('uri'), ActorCollection);
        if (actorDetails !== undefined) {
          model.set(actorDetails.toJSON());
        }
        else {
          model.fetch();
        }

      },

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content, options.roles);
      }
    });

    return ActorListView;

});
