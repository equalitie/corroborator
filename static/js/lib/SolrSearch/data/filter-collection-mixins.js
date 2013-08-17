/*global define*/
// Author: Cormac McGuire
// ### Description
// Mixins to allow reuse of common code

define (
  [
    'underscore', 'backbone',
    'lib/SolrSearch/data/filter-collection-elements',
    'lib/streams'
  ],
  function (_, Backbone, FilterCollectionElements, Streams) {
    'use strict';
    // used by actor/bulletin/incident collections to create groups of filters
    var searchBus, filterFilterListRequest, 
        FilterGroupCollection, FilterGroupMixin, SelectedFilterMixin;

    searchBus = Streams.searchBus;
    FilterGroupCollection = FilterCollectionElements.FilterGroupCollection;

    filterFilterListRequest = function(value) {
      return value.type === 'filter_list_request';
    };

    // Shared code across the different entities Filter group classes
    FilterGroupMixin = {
      // store a flat collection of all filters
      // iterate over filter groups to create collections
      createFilterGroupCollections: function(groups) {
        // empty the collection before we add the new filters
        this.reset([], {silent: true});
        this.allFilters.reset([]);
        _.each(groups, this.createFilterGroupCollection, this);
        this.trigger('reset');
      },

      sendResetEvent: function() {
        searchBus.push({
          type: 'filter_group_updated',
          content: this.allFilters,
          entity: this.entityType
        });
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
            key              : group.key,
            title            : group.title,
            numItems         : numItems,
            filterName       : filterName,
            displayFilterName: filterName,
            type             : this.entityType
          });
          filterGroupCollection.add(filterModel);
          this.allFilters.add(filterModel);
        }, this);

        this.add({
            groupKey: group.key,
            groupTitle: group.title,
            collection: filterGroupCollection
        });
      }
    };

    // selected filter mixin
    SelectedFilterMixin = {
      // find a model that matches the filter passed on from the searchBus
      findMatchingModel: function(filterModel) {
        return this.chain()
                   .filter(function(model) {
                     return model.get('key') === filterModel.get('key') &&
                     model.get('filterName') === filterModel.get('filterName'); 
                   })
                   .last()
                   .value();
      },

      watchForFilterEmptyRequest: function() {
        var self = this;
        searchBus.filter(function(value) {return value.type === 'empty_selected_filters';})
                 .onValue(function(value) {
                   console.log(self);
                   self.removeFilters();
                 });
      },
     
      removeFilters: function() {
        var filterModel;
        if (this.length > 0) {
          filterModel = this.first();
          this.remove(filterModel);
          searchBus.push({
            type: 'remove_filter',
            content: filterModel
          });
          this.removeFilters();
        }
        else {
          this.sendFiltersEmptyEvent();
        }
      },
      sendFiltersEmptyEvent: function() {
        searchBus.push({
          type: 'filter_empty',
          entityType: this.entityType
        });
      },

      // if the search results from free text search do not contain
      // one of the selected filters, remove it
      removeRedundantFilters: function(allFilters) {
        this.each(function(model) {
         var modelFound = (allFilters.findWhere({
            key: model.get('key'),
            filterName: model.get('filterName')
          }));
         if (modelFound === undefined) {
           this.remove(model);
         }
          
        }, this);

      },

      watchForFilterRequest: function() {
        searchBus.toEventStream()
                 .filter(filterFilterListRequest)
                 .onValue(this.sendCurrentFilters.bind(this));
      },

      // turn all the filter models int json objects
      serializedFilter: function() {
        return this.map(function(filterModels) {
          return filterModels.toJSON();
        });
      },

      sendCurrentFilters: function(value) {
        console.log(this);
        searchBus.push({
          type: 'filter_list_result_' + value.content.key,
          content: {
            entityType: this.entityType,
            filters: this.serializedFilter()
          }
        });
      },

      // remove previous date filter from selected filters if it exists
      removeExistingDateFilters: function(filterModel) {
        // a wee date filter
        var filterDateFilters = function(model) {
          return model.get('dateFilter') === true;
        };

        // this should only be done if there are two date filters
        if (this.filter(filterDateFilters).length === 2) {
          var dateFilter = this.chain()
            .filter(filterDateFilters)
            .reject(function(model) { 
              return model.cid === filterModel.cid; 
            })
            .last()
            .value();
          this.remove(dateFilter);
        }
      },

      // iterate over the filters to updated the totals/existence of each
      // filter model after an all entity search
      updateFilterTotals: function(filterModel) {
        var filterName,
            self = this,
            model = this.findMatchingModel(filterModel);

        if (model !== undefined) {
            model.set('numItems', filterModel.get('numItems'));
            searchBus.push({
              type: 'selected_item',
              content: model
            });
          }
      }
    };
    return {
      FilterGroupMixin: FilterGroupMixin,
      SelectedFilterMixin: SelectedFilterMixin
    };
});



