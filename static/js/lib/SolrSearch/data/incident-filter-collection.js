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
    'lib/streams',
    'lib/SolrSearch/data/filter-collection-elements'
  ],
  function(Backbone, Streams, FilterCollectionElements) {

        // filter out the actor filters event
    var FilterGroupCollection = FilterCollectionElements.FilterGroupCollection,
        filterIncidentFilters = function(value) {
          return value.type === 'parse_filters_incident';
        },
        filterIncidentFilterEvents = function(value) {
          return value.type === 'filter_event_incident';
        },
        filterTitles = {
          'incident_assigned_exact': 'Assigned To',
          'most_recent_status_incident_exact': 'Status',
          'incident_labels_exact': 'Labels',
          'crimes_exact': 'Crimes'
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
        
    // ### IncidentFilterCollection
    // This collection stores the filters related to actors
    var IncidentFilterCollection = Backbone.Collection.extend({
      initialize: function() {
        this.watchSearchStream();
      },
      // watch for events in the search stream and pull out the
      // actor filter ones
      watchSearchStream: function() {
        var self = this;
        searchBus.toProperty()
                 .filter(filterIncidentFilters)
                 .map(extractFilters)
                 .onValue(function(filters) {
                   self.createFilterGroupCollections(filters);
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

    // ### SelectedIncidentFilterCollection
    // Maintain a list of selected incident filters 
    var SelectedIncidentFilterCollection = Backbone.Collection.extend({
      initialize: function(options) {
        this.watchSearchStream();
      },
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterIncidentFilterEvents)
                 .onValue(function (value) {
                   self.add(value.content.filter);
                 });
      },
    });

    return {
      IncidentFilterCollection: IncidentFilterCollection,
      SelectedIncidentFilterCollection: SelectedIncidentFilterCollection
    };

});
