/*global define*/
// Author: Cormac McGuire
// ### Description
// Apply the saved search with all it's filters

define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';
    var init, filterPredefinedSearchRequest, filterFiltersEmpty, SearchLoader, searchBus;


    searchBus = Streams.searchBus;

    filterFiltersEmpty = function(value) {
      return value.type === 'filter_empty';
    };
    
    filterPredefinedSearchRequest = function(value) {
      return value.type === 'predefined_search';
    };
    init = function() {
      var searchLoader = new SearchLoader();
    };

    SearchLoader = function() {
      this.watchForSearchLoadRequests();
      this.watchForEmptiedFilters();
    };

    SearchLoader.prototype = {
      emptyFlags: {
        actor: false,
        bulletin: false,
        incident: false
      },
      searchObject: {
        raw: '',
        encoded: ''
      },
      resetEmptyFlags: function() {
        this.emptyFlags.actor = this.emptyFlags.bulletin = this.emptyFlags.incident = false;
      },
      checkFiltersEmpty: function () {
        return this.actorsEmpty    === true &&
               this.bulletinsEmpty === true &&
               this.incidentsEmpty === true;
      },
      watchForSearchLoadRequests:function() {
        searchBus.toEventStream()
                 .filter(filterPredefinedSearchRequest)
                 .onValue(this.loadSearch.bind(this));
        return this;
      },
      watchForEmptiedFilters: function () {
        searchBus.filter(filterFiltersEmpty)
                 .onValue(this.setEmptyFlag.bind(this));
        return this;
      },
      
      setEmptyFlag: function(value) {
        this.emptyFlags[value.entityType] = true;
        this.sendSearchRequest();
      },
      
      sendSearchRequest: function () {
        searchBus.push({
          type: 'search_updated',
          content: this.searchObject
        })
      },
      
      loadSearch: function(value) {
        this.emptyCurrentSelectedFilters();
        this.searchObject.raw = value.content.get('search_string');
        this.searchObject.encoded = value.content.get('search_string');
      },
      emptyCurrentSelectedFilters: function() {
        searchBus.push({
          type: 'empty_selected_filters'
          });
        return this;
      }
    };

    return {
      init: init
    };
});

