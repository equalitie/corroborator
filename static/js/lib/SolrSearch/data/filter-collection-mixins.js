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
    var searchBus = Streams.searchBus,
        FilterGroupCollection = FilterCollectionElements.FilterGroupCollection,
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
                key: group.key,
                title: group.title,
                numItems: numItems,
                filterName: filterName,
                type: this.entityType
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

    return {
      FilterGroupMixin: FilterGroupMixin
    };
});



