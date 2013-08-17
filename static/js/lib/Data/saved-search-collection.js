/*global define*/
// Author: Cormac McGuire
// ### Description
// This represents the list of saved searches in the system

define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';

    var SavedSearchModel, SavedSearchCollection, filterSaveSearch,
        searchBus;

    searchBus = Streams.searchBus;

    filterSaveSearch = function (value) {
      return value.type === 'send_saved_search';
    };

    // ### SavedSearchModel
    // store and persist saved searches inculding a title and
    // the filters and search string
    SavedSearchModel = Backbone.Model.extend({
      initialize: function() {
      },
      url: function() {
      }
    });

    // ### SavedSearchCollection
    // store a collection of saved searches
    SavedSearchCollection = Backbone.Collection.extend({
      initialize: function() {
        this.watchForNewSavedSearch();
      },
      watchForNewSavedSearch: function() {
        searchBus.toEventStream()
                 .filter(filterSaveSearch)
                 .onValue(this.addSavedSearch.bind(this));
      },
      addSavedSearch: function(value) {
        var searchModel = value.content;
        var savedSearchModel = new SavedSearchModel({
          search_title    : searchModel.searchTitle, 
          search_string   : searchModel.searchString,
          actor_filters   : searchModel.filters.actor,
          bulletin_filters: searchModel.filters.bulletin,
          incident_filters: searchModel.filters.incident,
          name_en         : searchModel.searchTitle,
          search_request  : 'predefined_search',
          type            : 'predefined_search'
        });
        console.log(savedSearchModel);
        this.add(savedSearchModel);
      }
    });

    return {
     SavedSearchCollection: SavedSearchCollection
    };
});
