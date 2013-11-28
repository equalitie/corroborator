/*global define*/
// Author: Cormac McGuire
// ### Description
// Mixins to allow reuse of common code

define (
  [
    'underscore', 'backbone',
    'lib/SolrSearch/data/filter-collection-elements',
    'lib/SolrSearch/data/location-collection',
    'lib/streams',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (_, Backbone, FilterCollectionElements, Location, Streams, i18n) {
    'use strict';
    // used by actor/bulletin/incident collections to create groups of filters
    var searchBus, filterFilterListRequest,
        FilterGroupCollection, FilterGroupMixin, SelectedFilterMixin,
        excludeKeys, excluded_keys, convertToJSON,
        LocationCollection = new Location.LocationCollection(),
        groupMap;

    searchBus = Streams.searchBus;
    FilterGroupCollection = FilterCollectionElements.FilterGroupCollection;

    filterFilterListRequest = function(value) {
      return value.type === 'filter_list_request';
    };

    // keys we want to exclude
    excluded_keys = [
      'marker' // leaflet object
    ];

    // exclude keys that we don't want to save from filters
    excludeKeys = function(model_json) {
      _(excluded_keys).each(function(key) {
        delete model_json[key];
      });
      return model_json;
      
    };

    // convert backbone models to json for serialization and saving
    convertToJSON = function(model) {
      return model.toJSON();
    };

    // map filter keys to their titles
    groupMap = function(key) {
      var groupTitleMap = {
          'bulletin_labels_exact':i18n.filters.bulletin_labels_exact,
          'bulletin_assigned_user_exact':i18n.filters.bulletin_assigned_user_exact,
          'bulletin_sources_exact':i18n.filters.bulletin_sources_exact,
          'bulletin_created_exact':i18n.filters.bulletin_created_exact,
          'most_recent_status_bulletin_exact':i18n.filters.most_recent_status_bulletin_exact,
          //Incident fields
          'confidence_score_exact':i18n.filters.confidence_score_exact,
          'incident_times_exact':i18n.filters.incident_times_exact,
          'incident_labels_exact':i18n.filters.incident_labels_exact, 
          'incident_assigned_user_exact':i18n.filters.incident_assigned_user_exact,
          'incident_crimes_exact':i18n.filters.incident_crimes_exact,
          'incident_created_exact':i18n.filters.incident_created_exact,
          'most_recent_status_incident_exact':i18n.filters.most_recent_status_incident_exact,
          //Actor fields
          'age_en_exact':i18n.filters.age_en_exact,
          'age_ar_exact':i18n.filters.age_ar_exact,
          'sex_en_exact':i18n.filters.sex_en_exact,
          'sex_ar_exact':i18n.filters.sex_ar_exact,
          'civilian_en_exact':i18n.filters.civilian_en_exact,
          'civilian_ar_exact':i18n.filters.civilian_ar_exact,
          'nationality_en_exact':i18n.filters.nationality_en_exact,
          'nationality_ar_exact':i18n.filters.nationality_ar_exact,
          'occupation_en_exact':i18n.filters.occupation_en_exact,
          'occupation_ar_exact':i18n.filters.occupation_ar_exact,
          'position_en_exact':i18n.filters.position_en_exact,
          'position_ar_exact':i18n.filters.position_ar_exact,
          'ethnicity_en_exact':i18n.filters.ethnicity_en_exact,
          'ethnicity_ar_exact':i18n.filters.ethnicity_ar_exact,
          'spoken_dialect_en':i18n.filters.spoken_dialect_en,
          'spoken_dialect_ar':i18n.filters.spoken_dialect_ar,
          'incident_locations_exact':i18n.filters.incident_locations_exact,
          'bulletin_locations_exact':i18n.filters.bulletin_locations_exact,
          'POB_exact':i18n.filters.POB_exact,
          'current_location_exact':i18n.filters.current_location_exact
      };
      return groupTitleMap[key];
    };

    // Shared code across the different entities Filter group classes
    FilterGroupMixin = {

      // store a flat collection of all filters
      // iterate over filter groups to create collections
      createFilterGroupCollections: function(groups) {
        // empty the collection before we add the new filters
        this.allFilters.reset([]);
        _.each(groups, this.createFilterGroupCollection, this);
        this.reset(this.filterGroupCollections);
        this.filterGroupCollections = [];

      },

      sendResetEvent: function() {
        searchBus.push({
          type: 'filter_group_updated',
          content: this.allFilters,
          entity: this.entityType
        });
      },

      createKeyFilter: function(key) {
        return function(filterCollection) {
          return filterCollection.get('groupKey') === key;
        };
      },

      findFilterGroupCollection: function(key) {
        var keyFilter = this.createKeyFilter(key);
        var filterGroupCollection = 
          this.chain()
           .filter(keyFilter)
           .last()
           .value();
        return filterGroupCollection;
      },

      getFilterGroupCollection: function(key) {
        var filterCollection = this.findFilterGroupCollection(key);
        if (filterCollection === undefined) {
          filterCollection = new FilterGroupCollection();
          filterCollection.watchForFilterLoadRequest(this.entityType);
          filterCollection.groupKey = key;
        }
        else {
          filterCollection = filterCollection.get('collection');
          filterCollection.reset([], {silent: true});
        }
        return filterCollection;
      },


      // create collections for each filter group  
      // we create this as a model that gets added to this collection
      createFilterGroupCollection: function(group) {
        // remove the key and title from the passed in filters
        var filters = _.omit(group, ['key', 'title']);
        var filterGroupCollection = this.getFilterGroupCollection(group.key);
        _.each(filters, function(numItems, filterName) {
          var filterModel = new Backbone.Model({
            key              : group.key,
            title            : group.title,
            numItems         : numItems,
            filterName       : filterName,
            displayFilterName: filterName,
            type             : this.entityType
          });
          filterGroupCollection.addFilter(filterModel);
        }, this);
        this.allFilters.add(filterGroupCollection.models);

        this.filterGroupCollections.push({
            groupKey: group.key,
            groupTitle: groupMap(group.key),
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
                   self.removeFilters();
                 });
      },
     
      removeFilters: function() {
        var filterModel;
        if (this.length > 0) {
          filterModel = this.first();
          this.remove(filterModel);
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
        return this.chain()
                   .map(convertToJSON)
                   .map(excludeKeys)
                   .value();
      },

      sendCurrentFilters: function(value) {
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
