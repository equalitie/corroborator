/*global define*/
// Author: Cormac McGuire  
// Collection to store the filters sent by solr  
// These are rendered into views in lib/SolrSearch/views/filters  
// Content comes from the search bus events identified by parse_filters_actor  
// This should not be used directly, filter-collections.js aggregates and 
// provides access to collection instances

define(
  [
    'backbone',
    'underscore',
    'lib/streams',
    'lib/SolrSearch/data/filter-collection-elements'
  ],
  function(Backbone, _, Streams, FilterCollectionElements) {
    'use strict';

    // filter out the actor filters event
    var FilterGroupCollection = FilterCollectionElements.FilterGroupCollection,
        filterActorFilters = function(value) {
          return value.type === 'parse_filters_actor';
        },
        filterActorFilterEvents = function(value) {
          return value.type === 'filter_event_actor';
        },
        filterTitles = {
          'age_en_exact': 'Age',
          'sex_en_exact': 'Gender',
          'civilian_en_exact': 'Type',
          'nationality_en_exact': 'Nationality'
        },

        // used to map the filters object to an array of objects with the 
        // key set as a field called key on each object
        createFilterGroup = function(key) {
            var filterGroup = this.content[key];
            filterGroup.key = key;
            filterGroup.title = filterTitles[key];
            return filterGroup;
        },

        // pull the filters from the message content
        extractFilters = function(value) {
          var keys = _.keys(value.content);
          return _.map(keys, createFilterGroup, value);
        },
        searchBus = Streams.searchBus;
        
    // ### ActorFilterCollection
    // This collection stores the filter groups related to actors  
    // listens for remove_filters event triggered directly on the collection
    // by a view displaying it's contents
    var ActorFilterCollection = Backbone.Collection.extend({
      selectedFilters: undefined,

      initialize: function() {
        this.watchSearchStream();
        this.on('select_filter', this.selectFilter, this);
      },

      // watch for events in the search stream and pull out the
      // actor filter ones
      watchSearchStream: function() {
        var self = this;
        searchBus.toProperty()
                 .filter(filterActorFilters)
                 .map(extractFilters)
                 .onValue(function(value) {
                   self.createFilterGroupCollections(value);
                 });
      },

      // iterate over filter groups to create collections
      createFilterGroupCollections: function(groups) {
        _.each(groups, this.createFilterGroupCollection, this);
        this.trigger('reset');
      },

      // create collections for each filter group  
      // we create this as a model that gets added to this collection
      createFilterGroupCollection: function(group) {
        // remove the key and title from the passed in filters
        var filters = _.omit(group, ['key', 'title']);
        var filterGroupCollection = new FilterGroupCollection();
        filterGroupCollection.groupKey = group.key;
        _.each(filters, function(numItems, filterName) {
          var filterModel = new Backbone.Model({
            key: group.key,
            title: group.title,
            numItems: numItems,
            filterName: filterName,
            type: 'actor'
          });
          filterGroupCollection.add(filterModel);
        }, this);

        this.add({
            groupKey: group.key,
            groupTitle: group.title,
            collection: filterGroupCollection
        });
      }

    });


    // ### SelectedActorFilterCollection
    // Maintain a list of selected actor filters 
    var SelectedActorFilterCollection = Backbone.Collection.extend({
      initialize: function(options) {
        this.watchSearchStream();
      },
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterActorFilterEvents)
                 .onValue(function (value) {
                   self.add(value.content.filter);
                 });
      },
    });
    

    return {
      ActorFilterCollection: ActorFilterCollection,
      SelectedActorFilterCollection: SelectedActorFilterCollection
    };


});
