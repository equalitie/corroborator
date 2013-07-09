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
    'lib/streams'
  ],
  function(Backbone, Streams) {

        // filter out the actor filters event
    var filterActorFilters = function(value) {
          return value.type === 'parse_filters_actor';
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
        this.selectedFilters = new SelectedActorFilterCollection({
          availableFilters: this
        });
        this.selectedFilters.on('remove', this.reInsertFilter, this);
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
                   self.reset(value);
                 });
      },
      // add a filter to the selectFilters
      selectFilter: function(model) {
        this.remove(model);
        this.selectedFilters.add(model);
        console.log(this, this.selectedFilters);
      }

    });



    // ### SelectedActorFilterCollection
    // Maintain a list of selected actor filters 
    var SelectedActorFilterCollection = Backbone.Collection.extend({
      initialize: function(options) {
        this.availableFilters = options.availableFilters;
      }
    });
    

    return {
      ActorFilterCollection: ActorFilterCollection,
      SelectedActorFilterCollection: SelectedActorFilterCollection
    };


});
