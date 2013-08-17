/*global define*/
// Author: Cormac McGuire
// ### Description
// This defines a SelectedFilterCollection and a Filter Group collection that
// can be re-used across all your filter collections to model groups of 
// filters within each data type and to manage filters selected by each user


define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';

    var FilterGroupCollection,
        filterRemoveFilterEvents = function(value) {
          return value.type === 'remove_filter';
        },
        filterSelectedItem = function(value) {
          return value.type === 'selected_item';
        },
        filterPredefinedSearch = function(value) {
          return value.type === 'predefined_search';
        },
        extractContent = function(value) {
          return value.content;
        },
        searchBus = Streams.searchBus;

    // ### FilterGroupCollection
    // Collection to store the groups of filters associated with
    // each entity
    FilterGroupCollection = Backbone.Collection.extend({
      // this needs to be set when creating a filter group collection
      groupKey: '',
      subscribers: [],
      // constructor
      initialize: function() {
        this.watchSearchStream();
        this.watchSelectedItemUpdate();
        this.watchForPredefinedSearch();
      },
      // watch for removeFilter events
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterRemoveFilterEvents)
                 // check the filter is associated with this group
                 .filter(function(value) {
                   return value.content.get('key') === self.groupKey;
                 })
                 .onValue(function(value) {
                   self.add(value.content);
                 });
      },
      watchForPredefinedSearch: function() {
        var subscriber =
        searchBus.filter(filterPredefinedSearch)
                 .subscribe(this.updateFilterGroups.bind(this));
        this.subscribers.push(subscriber);
      },

      watchSelectedItemUpdate: function() {
        var subscriber = 
          searchBus.filter(filterSelectedItem)
                   .map(extractContent)
                   .subscribe(this.updateSelectedItem.bind(this));
        this.subscribers.push(subscriber);
      },

      updateFilterGroups: function(evt) {
      },

      updateSelectedItem: function(evt) {
        var selectedFilterModel, filterName, filterKey;
          selectedFilterModel = evt.value();
          filterName = selectedFilterModel.get('filterName');
          filterKey  = selectedFilterModel.get('key');
          this.removeFilter(filterKey, filterName);
      },

      removeSelectedFilter: function(filterKey, filterName) {
          var filter = 
            this.chain()
                .filter(function (model) {
                  return model.get('key') === filterKey &&
                         model.get('filterName') === filterName;
                })
                .last()
                .value();
          
          if (filter !== undefined) {
            this.remove(filter);
          }
      }
    });

    
    
    return {
      FilterGroupCollection: FilterGroupCollection 
    };
});

