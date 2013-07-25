/*global Bootstrap*/
//
// Author Cormac McGuire
//
// actor.js
//
// Represent a single actor and a group of actors
//
// TODO: refactor common logic for all collections

define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/Data/collection-mixins'
  ],
  function($, _, Backbone, Streams, Mixins) {
    'use strict';

    var crudBus   = Streams.crudBus,
        searchBus = Streams.searchBus,
        PersistSelectionMixin = Mixins.PersistSelectionMixin,
        ModelSelectionMixin = Mixins.ModelSelectionMixin,
        ModelSyncMixin = Mixins.ModelSyncMixin,
        Filters = new Mixins.Filters(),
    // ### event stream processing helpers
        filterActorResults = function(value) {
          return value.type === 'results_actor';
        },
        filterActor = function(value) {
          return value.navValue === 'actor';
        },
        mapSort = function(value) {
          var sortMap = {
            'date': 'actor_created',
            'title': 'fullname_en'
          };
          return sortMap[value];
        };


    // ##Data representations

    // ### Actor Model
    // provide api endpoint for Actor model
    var ActorModel = Backbone.Model.extend({
      foreignKeyFields: ['POB', 'current_location', 'media'] ,
      idAttribute: 'django_id',
      url: function() {
        var base = '/api/v1/actor/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    _.extend(ActorModel.prototype, ModelSyncMixin);

    // ### Actor Collection
    var ActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      compareField: 'actor_created',
      selectedIdList: [],
      initialize: function() {
        this.watchSearchResults();
        this.watchSelection();
        this.watchSort();
        this.watchCreate();
        // event handlers for these are in the PersistSelectionMixin
        // TODO: have the mixin set these some way
        this.on('change', this.updateSelectedIdList, this);
        this.on('reset', this.selectModelsAfterReset, this);
      },
      // sort is implemented based on the result of this function
      comparator: function(model) {
        return model.get(this.compareField);
      },
      setComparatorField: function() {
      },
      // watch the search bus to update the actor collection when new actor
      // results are received from solr
      watchSearchResults: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterActorResults)
               .map(Filters.extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },


      // watch for selections from the action combo box
      watchSelection: function() {
        var self = this;
        var actorStream = Streams.searchBus.filter(filterActor);

        actorStream.filter(Filters.filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        actorStream.filter(Filters.filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        actorStream.filter(Filters.filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },

      //
      // listen for sort request events
      // originate from header.js in SolrSearch views
      //
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterActor)
        .map(Filters.extractOption)
        .map(mapSort)
        .onValue(function (value) {
          self.compareField = value;
          self.sort();
        });
      },
      watchCreate: function() {
        var self = this;
        crudBus.filter(function(value) { return value.type === 'create_new_actor'; })
               .onValue(function(value) {
                 var actorModel = new ActorModel(value.content);
                 actorModel.save();
                 self.add(actorModel);
               });
      }

    });
    // add our mixins to the collection
    _.extend(ActorCollection.prototype, PersistSelectionMixin);
    _.extend(ActorCollection.prototype, ModelSelectionMixin);


    return {
      ActorCollection: ActorCollection,
      ActorModel: ActorModel
    };
});
