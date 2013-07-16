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
    'lib/SolrSearch/data/filter-collection-mixins'
  ],
  function(Backbone, Streams, Mixins) {

        // filter out the actor filters event
    var FilterGroupMixin = Mixins.FilterGroupMixin,
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
      entityType: 'incident',
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
      }
    });
    _.extend(IncidentFilterCollection.prototype, FilterGroupMixin);

    // ### SelectedIncidentFilterCollection
    // Maintain a list of selected incident filters 
    var SelectedIncidentFilterCollection = Backbone.Collection.extend({
      initialize: function(options) {
        this.watchSearchStream();
        this.on('add remove', this.sendFilter, this);
      },
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterIncidentFilterEvents)
                 .onValue(function (value) {
                   self.add(value.content.filter);
                 });
        searchBus.filter(filterIncidentFilters)
                 .map(extractFilters)
                 .onValue(function(value) {
                   _(value).each(self.updateFilterTotals, self);
                 });
      },

      // find a model that matches the filter passed on from the searchBus
      findMatchingModel: function(solrFilter) {
        return this.chain()
                   .filter(function(model) {
                     return model.get('key') === solrFilter.key; 
                   })
                   .last()
                   .value();
      },

      // iterate over the filters to updated the totals/existence of each
      // filter model after an all entity search
      updateFilterTotals: function(solrFilter) {
        var filterName,
            model = this.findMatchingModel(solrFilter);

        if (model !== undefined) {
          filterName = model.get('filterName');
          if (solrFilter[filterName] !== undefined) {
            model.set('numItems', solrFilter[filterName]);
          }
          else {
            model.destroy();
          }
        }
      },

      sendFilter: function(filterModel) {
        Streams.searchBus.push({
          type: 'filter_event_add',
          content: this.models
        });
      }
    });

    return {
      IncidentFilterCollection: IncidentFilterCollection,
      SelectedIncidentFilterCollection: SelectedIncidentFilterCollection
    };

});
