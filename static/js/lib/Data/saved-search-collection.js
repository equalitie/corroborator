/*global define, Bootstrap*/
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
        var base = '/api/v1/predefinedSearch/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    // ### SavedSearchCollection
    // store a collection of saved searches
    SavedSearchCollection = Backbone.Collection.extend({
      initialize: function() {
        this.reset(Bootstrap.predefined_list);
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
        savedSearchModel.set('user', Bootstrap.userResource);
        this.add(savedSearchModel, {at: 0});
        savedSearchModel.save();
      }
    });

    return {
     SavedSearchCollection: SavedSearchCollection
    };
});
