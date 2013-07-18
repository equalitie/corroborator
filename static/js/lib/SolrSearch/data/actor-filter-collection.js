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
    'bacon',
    'underscore',
    'lib/streams',
    'lib/SolrSearch/data/filter-collection-mixins'
  ],
  function(Backbone, Bacon, _, Streams, Mixins) {
    'use strict';


    // shared functionality with other filter collections
    var FilterGroupMixin = Mixins.FilterGroupMixin,

        // filter out event with notification of actor filter createion
        filterGroupUpdated = function(value) {
          return value.type === 'filter_group_updated' &&
                 value.entity === 'actor';
        },
        
        filterActorFilters = function(value) {
          return value.type === 'parse_filters_actor';
        },
        filterSelectedItemEvents = function(value) {
          return value.type === 'selected_item_actor';
        },

        // actor filter event
        filterActorFilterEvents = function(value) {
          return value.type === 'filter_event_actor';
        },

        // map solr facet to labels
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
      entityType: 'actor',
      allFilters: new Backbone.Collection(),

      initialize: function() {
        this.watchSearchStream();
        this.on('select_filter', this.selectFilter, this);
        this.on('reset', this.sendResetEvent, this);
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
        searchBus.toProperty()
                 .filter(filterSelectedItemEvents)
                 .onValue(function(value) {
                   self.remove(value.content);
                 });
      }
    });
    // apply mixin
    _.extend(ActorFilterCollection.prototype, FilterGroupMixin);


    // ### SelectedActorFilterCollection
    // Maintain a list of selected actor filters  
    // This needs to watch for filters being added from filter views
    // and removed by selectedfilter views  
    // It also needs to update the counts if a currently selected filters numbers
    // have updated, and remove the filter if it doesn't apply
    var SelectedActorFilterCollection = Backbone.Collection.extend({
      initialize: function(options) {
        this.watchSearchStream();
        this.on('add remove', this.sendFilter, this);
      },

      // watch for filters being added/ removed via filter clicks
      // and from the overall search
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterActorFilterEvents)
                 .onValue(function (value) {
                   self.add(value.content.filter);
                 });
        // this receives the new models from the
        searchBus.filter(filterGroupUpdated)
                 //.map(extractFilters)
                 .onValue(function(allFilters) {
                   allFilters.content.each(self.updateFilterTotals, self);
                   self.removeRedundantFilters.call(self, allFilters.content);
                   self.sendFilter();
                 });
      },

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
      removeRedundantFilters: function(allFilters) {
        console.log(this, allFilters);
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
      },

      sendFilter: function(filterModel) {
        Streams.searchBus.push({
          type: 'filter_event_add_actor',
          content: this.models
        });
      }

    });
    

    return {
      ActorFilterCollection: ActorFilterCollection,
      SelectedActorFilterCollection: SelectedActorFilterCollection
    };


});
