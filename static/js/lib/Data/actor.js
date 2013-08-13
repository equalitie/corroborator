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
    'lib/Data/collection-mixins',
    'lib/Data/comparator'
  ],
  function($, _, Backbone, Streams, Mixins, Comparator) {
    'use strict';


    var crudBus               = Streams.crudBus,
        searchBus             = Streams.searchBus,
        SuperCollection       = Mixins.SuperCollection,
        PersistSelectionMixin = Mixins.PersistSelectionMixin,
        ModelSelectionMixin   = Mixins.ModelSelectionMixin,
        ModelSyncMixin        = Mixins.ModelSyncMixin,
        Filters               = new Mixins.Filters(),
        parseComparator       = Comparator.parseComparator,

        // ### event stream processing helpers
        filterActorResults = function(value) {
          return value.type === 'results_actor';
        },
        filterActor = function(value) {
          return value.navValue === 'actor';
        },
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        },
        mapSort = function(value) {
          var sortMap = {
            'date' : 'actor_created',
            'title': 'fullname_en',
            'age'  : 'age_en'
          };
          return sortMap[value];
        },
        // context set to have actorIds variable
        filterByIds = function(model) {
          return _.contains(this.actorIds, model.id);
        };


    // ##Data representations

    // ### Actor Model
    // provide api endpoint for Actor model  
    // if resourceUri is set in the options the model will
    // auto fetch it's data
    var ActorModel = Backbone.Model.extend({
      foreignKeyFields: ['POB', 'current_location', 'media'] ,
      manyToManyFields: [
        'actors_role'
      ],
      idAttribute: 'id',
      initialize: function(options) {
        this.set('entityType', 'actor');
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('django_id', id);
          this.set('id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/actor/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    _.extend(ActorModel.prototype, ModelSyncMixin);

    var SimpleActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      filterByIds: function(actorIds) {
        var context = {
          actorIds: actorIds
        };
        return new Backbone.Collection(this.filter(filterByIds, context));
      }

    });

    // ### Actor Collection
    var ActorCollection = SimpleActorCollection.extend({
      compareField: 'actor_created',
      selectedIdList: [],
      initialize: function() {
        this.watchSearchResults();
        this.watchSelection();
        this.watchSort();
        this.watchCreate();
        this.createSuperCollection();
        // event handlers for these are in the PersistSelectionMixin
        // TODO: have the mixin set these some way
        this.on('change', this.updateSelectedIdList, this);
        this.on('reset', this.selectModelsAfterReset, this);
      },
      // sort is implemented based on the result of this function
      comparator: function(model) {
        return parseComparator(model.get(this.compareField));
      },
      setComparatorField: function() {
      },
      // watch the search bus to update the actor collection when new actor
      // results are received from solr
      watchSearchResults: function() {
        Streams.searchBus.toProperty()
               .filter(filterActorResults)
               .map(Filters.extractResults)
               .onValue(this.resetCollection.bind(this));
      },
      resetCollection: function(results) {
        if (this.length !==0) {
          _.map(results, function(result) {
            result.id = result.django_id;
          });
          this.set(results);
          this.trigger('reset');
        }
        else {
          this.reset(results, {parse: true});
        }
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
                 self.add(value.content);
               });
      }

    });
    // add our mixins to the collection
    _.extend(ActorCollection.prototype, PersistSelectionMixin);
    _.extend(ActorCollection.prototype, ModelSelectionMixin);
    _.extend(ActorCollection.prototype, SuperCollection);


    return {
      ActorCollection: ActorCollection,
      SimpleActorCollection: SimpleActorCollection,
      ActorModel: ActorModel
    };
});
