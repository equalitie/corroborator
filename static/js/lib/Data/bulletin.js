/*global Bootstrap*/
// Author: Cormac McGuire  
// bulletin.js  
// Represent a single bulletin and a group of bulletins  
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

    var PersistSelectionMixin = Mixins.PersistSelectionMixin,
        crudBus               = Streams.crudBus,
        searchBus             = Streams.searchBus,
        ModelSelectionMixin   = Mixins.ModelSelectionMixin,
        ModelSyncMixin        = Mixins.ModelSyncMixin,
        Filters               = new Mixins.Filters(),
        parseComparator       = Comparator.parseComparator,
        // ### Bulletin Specific filter stream processors

        // filter bulletin nav requests
        filterBulletin = function(value) {
          return value.navValue === 'bulletin';
        },

        // filter out bulletin results
        filterBulletinResults = function(value) {
          return value.type === 'results_bulletin';
        },

        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        },

        // map sort request to model field
        mapSort = function(value) {
          var sortMap = {
            'date'    : 'bulletin_created',
            'title'   : 'title_en',
            'score'   : 'confidence_score',
            'status'  : 'most_recent_status_bulletin',
            'location': 'bulletin_locations'
          };
          return sortMap[value];
        };

    // ##Data representations


    // ### Bulletin Model
    // provide api endpoint for Bulletin model  
    // if resourceUri is set in the options the model will
    // auto fetch it's data
    var BulletinModel = Backbone.Model.extend({
      foreignKeyFields: [
        'assigned_user'
      ],
      manyToManyFields: [
        'sources', 'bulletin_comments', 'actors_role', 'times', 'medias',
        'locations', 'labels', 'ref_bulletins'
      ],
      initialize: function(options) {
        this.set('entityType', 'bulletin');
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('django_id', id);
          this.set('id', id);
          this.set('resource_uri', options.resourceUri);
          this.fetch();
        }
      },
      idAttribute: 'id',
      url: function() {
        var base = '/api/v1/bulletin/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    _.extend(BulletinModel.prototype, ModelSyncMixin);

    // ### Bulletin Collection
    // provide sort, selection functionality  
    // stores bulletins 
    var BulletinCollection = Backbone.Collection.extend({
      compareField: 'bulletin_created',
      model: BulletinModel,
      initialize: function() {
        this.watchEventStream();
        this.watchSelection();
        this.watchSort();
        this.watchCreate();
        // event handlers for these are in the PersistSelectionMixin
        // TODO: have the mixin set these some way
        this.on('change', this.updateSelectedIdList, this);
        this.on('reset', this.selectModelsAfterReset, this);
      },
      // models are sorted based on the result of this function
      comparator: function(model) {
        return parseComparator(model.get(this.compareField));
      },
      // watch the search bus to update the bulletin collection when new  
      // bulletin results are received from solr
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterBulletinResults)
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
        var bulletinStream = Streams.searchBus.filter(filterBulletin);

        bulletinStream.filter(Filters.filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        bulletinStream.filter(Filters.filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        bulletinStream.filter(Filters.filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },

      // listen for sort request events  
      // these originate from header.js in SolrSearch views
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterBulletin)
        .map(Filters.extractOption)
        .map(mapSort)
        .onValue(function (value) {
          self.compareField = value;
          self.sort();
        });
      },
      watchCreate: function() {
        var self = this;
        crudBus.filter(function(value) { return value.type === 'create_new_bulletin'; })
               .onValue(function(value) {
                 self.add(value.content);
               });
      }

    });
    _.extend(BulletinCollection.prototype, PersistSelectionMixin);
    _.extend(BulletinCollection.prototype, ModelSelectionMixin);

  return {
    BulletinModel: BulletinModel,
    BulletinCollection: BulletinCollection
  };

});
