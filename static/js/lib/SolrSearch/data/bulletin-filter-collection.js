/*global define*/
// Author: Cormac McGuire  
// Collection to store the filters sent by solr  
// These are rendered into views in lib/SolrSearch/views/filters  
// Content comes from the search bus events identified by parse_filters_bulletin  
// This should not be used directly, filter-collections.js aggregates and 
// provides access to collection instances

define(
  [
    'backbone',
    'lib/streams'
  ],
  function(Backbone, Streams) {

        // filter out the actor filters event
    var filterBulletinFilters = function(value) {
          return value.type === 'parse_filters_bulletin';
        },
        filterTitles = {
          'bulletin_assigned_exact': 'Assigned To',
          'most_recent_status_bulletin_exact': 'Status',
          'bulletin_labels_exact': 'Labels',
          'sources_exact': 'Sources'
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
        
    // ### BulletinFilterCollection
    // This collection stores the filters related to actors
    var BulletinFilterCollection = Backbone.Collection.extend({
      initialize: function() {
        this.watchSearchStream();
      },
      // watch for events in the search stream and pull out the
      // bulletin filter ones
      watchSearchStream: function() {
        var self = this;
        searchBus.toProperty()
                 .filter(filterBulletinFilters)
                 .map(extractFilters)
                 .onValue(function(value) {
                   self.reset(value);
                 });
        return this;
      }

    });

    return BulletinFilterCollection;


});