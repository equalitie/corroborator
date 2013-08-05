/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for actors, provide display of selected actors and select element
// to store them for the containing form

define (
  [
    'jquery', 'backbone', 'underscore', 'lib/streams',
    'lib/elements/select-option',
    'lib/Data/actor',
    'lib/CRUD/data/ActorRoleCollection',
    'lib/CRUD/views/search-views/actor/actor-result',
    'lib/Data/collections',
    'lib/CRUD/templates/search-templates/actor-search-field.tpl'
  ],
  function ($, Backbone, _, Streams, SelectOptionView, Actor, ActorRole, ActorResult,
    Collections,
    actorSearchTmp) {
    'use strict';
    var ActorSearchView,
        ActorRoleModel = ActorRole.ActorRoleModel,
        crudBus = Streams.crudBus,
        filterActorResults = function(value) {
          return value.type === 'results_actor';
        },
        filterActorUpdateRelationship = function(value) {
          return value.type === 'update_actor_relationship_request';
        },
        filterActorRelateRequest = function(value) {
          return value.type === 'relate_actor_request';
        };


    // ### ActorSearchView
    // Search for actors and display actors already associated with and entity
    // allows for adding of search results
    ActorSearchView = Backbone.View.extend({
      childViews: [],
      unsubFunctions: [],
      events: {
        'click .do-search': 'searchActorsRequested',
        'click .do-clear' : 'clearSearchRequested'
      },
      template: actorSearchTmp,
      actorCollection: undefined,
      renderCollection: undefined,
      // constructor
      // pass in collection of existing Actors related to this entity
      // or create a new one
      initialize: function(options) {
        if (this.collection === undefined) {
          this.collection = new Backbone.Collection();
        }

        this.entityType = options.entityType;
        this.listenTo(this.collection, 'remove sync', this.renderSelectOptions.bind(this));
        this.renderCollection = new Backbone.Collection();
        this.listenTo(this.renderCollection, 'add remove', this.renderActors.bind(this));
        this.createActorCollection();
        this.listenForActorsAdded();
        this.listenForActorUpdate();

        if (options.content) {
          _.each(options.content, function(resourceUri) {
            var initialActorModel = new ActorRoleModel({resource_uri: resourceUri});
            this.listenTo(initialActorModel, 'sync', this.createRenderActor.bind(this));
            this.collection.add(initialActorModel);
          }, this);
        }

        this.render();
      },

      createRenderActor: function(model) {
        var allActors = Collections.ActorCollection.superCollection;
        var actorModel = allActors.findWhere({resource_uri: model.get('actor')});
        this.renderCollection.add(actorModel);
        this.stopListening(model, 'sync', this.createRenderActor);
      },

      // create a collection to store all available actors
      createActorCollection: function() {
        this.actorCollection = new Actor.SimpleActorCollection();
        //this.actorCollection.on('reset', this.updateRenderCollection, this);
        this.actorCollection.model = Actor.ActorModel;
        this.listenForAvailableActors();
        this.requestAvailableActors();
      },

      // search solr for actors
      requestAvailableActors: function(inputText) {
        var searchText = inputText !== undefined ? inputText : '*';
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_search',
          content: {
            raw: inputText
          }
        });
      },

      // turn off event listeners and remove dom elements
      onDestroy: function() {
        this.stopListening();
        this.collection = undefined;
        this.actorCollection = undefined;
        this.renderCollection = undefined;
        this.destroySelectViews();
        this.destroyChildViews();
        this.unsubStreams();
      },

      // user clicked search
      searchActorsRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        this.requestAvailableActors(inputText);
        // opent the actor results box
        crudBus.push({
          type: 'actor-results',
          content: {}
        });
      },

      // clear the actor search box
      clearSearchRequested: function(evt) {
        evt.preventDefault();
        $(evt.currentTarget).siblings('input').val('');
      },

      // listen for the list of all available actors, used to populate the
      // added actors data
      listenForAvailableActors: function() {
        var self = this;
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterActorResults)
                 .subscribe(function(evt) {
                   var value = evt.value();
                   self.actorCollection.reset(value.content);
                 });
       this.unsubFunctions.push(subscriber);
      },

      // listen for an event specifying the actor who has been added
      listenForActorsAdded: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterActorRelateRequest)
                 .subscribe(this.addActorToCollections.bind(this));
       this.unsubFunctions.push(subscriber);
      },

      // listen for actor updated request
      listenForActorUpdate: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterActorUpdateRelationship)
                 .subscribe(this.processActorUpdateData.bind(this));
        this.unsubFunctions.push(subscriber);
      },

      // update the relationship type
      processActorUpdateData: function(evt) {
        var model = evt.value().content.model,
            role_en = evt.value().content.relationship;
        this.updateActorRoleModel(model, role_en);
      },

      // set the new role on the actor_role and save it
      updateActorRoleModel: function(model, role_en) {
        model.set('role_en', role_en);
        model.save();
        this.renderActors();
      },

      // create a new actor role
      createNewActorRole: function(actorRoleData) {
        var actorRole = new ActorRoleModel(actorRoleData);
        this.collection.add(actorRole);
        actorRole.save();
      },

      // see if the actor is already related to the entity
      existingActor: function(actorRoleData) {
        return this.collection
                   .chain()
                   .filter(function(model) { 
                      return model.get('actor') === actorRoleData.actor;
                   })
                   .last()
                   .value();
      },


      // add the selected actor to the render collection
      // and to the data collection
      addActorToCollections: function(evt) {
        var actorContent = evt.value().content;
        var actorRoleData = {
          role_en: actorContent.relationship,
          actor: actorContent.model.get('resource_uri')
        };
        this.createActorRoleEntity(actorRoleData);
        this.addActorToRenderCollection(actorContent.model);
      },

      // create the actor role entity on the backend that the 
      // entity will refer to
      // if the actor role already exists 
      createActorRoleEntity: function(actorRoleData) {
        var existingActor = this.existingActor(actorRoleData);
        if (existingActor === undefined) {
          this.createNewActorRole(actorRoleData);
        }
        else {
          this.updateActorRoleModel(existingActor, actorRoleData.role_en);
        }
      },

      // render the multiple select box 
      renderSelectOptions: function() {
        this.destroySelectViews();
        this.collection.each(this.addToSelectList, this);
        return this;
      },

      // add a selected option to the hidden select element
      addToSelectList: function(model) {
        var selectOptionView = new SelectOptionView({
          model: model
        });
        this.$el.children('select')
                .append(selectOptionView.$el);
        this.selectViews.push(selectOptionView);
      },

      // destroy the displayed actor views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // destroy the select option views
      destroySelectViews: function() {
        _.invoke(this.selectViews, 'destroy');
        this.selectViews = [];
      },

      // unsubscribe from bacon event streams
      unsubStreams: function() {
        _.each(this.unsubFunctions, function(unsub) {
          unsub();
        });
        this.unsubFunctions = [];
      },

      // add an actor model to the render collection
      addActorToRenderCollection: function(actorModel) {
        this.renderCollection.add(actorModel);
      },

      addOldModels: function(newRenderCollection, oldRenderCollection) {
        newRenderCollection.add(oldRenderCollection.toJSON());
        var merged = _.uniq(newRenderCollection.toJSON());
        return newRenderCollection.reset(merged, {silent: true});
      },

      

      // an actor has been removed propogate to the collecgtions
      unselectActor: function(model) {
        var findModel = function(actorRoleModel) {
          return actorRoleModel.get('actor') === model.get('resource_uri');
        };
        this.collection.remove(this.collection.find(findModel));
      },

      // render the related actors
      renderActors: function() {
        this.destroyChildViews();
        this.renderCollection.each(this.renderActor, this);
      },

      // render a single actor
      renderActor: function(model) {
        var resultView = new ActorResult({
          model: model,
          actorRoleModel: _.last(this.collection.where({
            'actor': model.get('resource_uri')
          })),
          collection: this.renderCollection,
          type: 'selected'
        });
        this.childViews.push(resultView);
        this.$el.children('ul').append(resultView.$el);
      },

      //render the input field and buttons
      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.empty()
                .append(html);
      }
    });
    return ActorSearchView;
});
