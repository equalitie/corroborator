/*global define, AjaxSolr*/
// Author: Cormac McGuire
// ### Description
// provide a filter widget that allows for filtering based on the filters
// returned from the original solr search

define(
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/SolrSearch/solr/parse-filters',
    // solr shizz
    'core/Core',
    'core/AbstractFacetWidget'
  ], 
  function(Backbone, _, Streams, ParseFilter) {
    'use strict';
    var FilterWidget,
        searchBus = Streams.searchBus,
        navBus    = Streams.navBus,

        filterSearchRequestEvents = function(value) {
          return value.type === 'new_search';
        },
        // parse actor results from the result object
        filterActors = function(element) {
          return element.django_ct.search(/actor/) > -1;
        },
        // parse bulletin results from the result object
        filterBulletin = function(element) {
          return element.django_ct.search(/bulletin/) > -1;
        },

        // parse incident results from the result object
        filterIncident = function(element) {
          return element.django_ct.search(/incident/) > -1;
        },

        // mapping to relate nav keys to filter function
        filterMap = {
          actor: filterActors,
          incident: filterIncident,
          bulletin: filterBulletin
        },

        // send the results off to the search bus
        pushResults = function(results, entityType) {
          Streams.searchBus.push({
            type: 'results_' + entityType,
            content: results
          }); 
        },

        // extract content from filter event
        mapFilterToValue = function(value) {
          return value.content;
        };

    // ## FilterWidget
    // Create a widget to send / receive filtered searches to/from solr
    FilterWidget = AjaxSolr.AbstractFacetWidget.extend({
      queryString: '',
      entity: '',
      sendFilter: true,

      // constructor  
      // start our event listeners  
      // create a collection to manager our filters, bind the sendRequest
      // function to change events on the collection
      init: function(){
        this.watchFilterEvents();
        this.watchSearchStream();
        this.filterCollection = new Backbone.Collection();
        //this.filterCollection.on('reset', this.sendRequest, this);
      },

      emptyQueryStrings: function() {
        this.manager.store.remove('q');
        this.manager.store.remove('fq');
        return this;
      },
      populateFreeTextQueryString: function () {
        if (this.queryString.length) {
          this.manager.store.addByValue('q', '*' + this.queryString + '*');
        }
        else {
          this.manager.store.addByValue('q', '*:*');
        }
        return this;
      },


      // empty the previous query, and rebuild a new one, then send the request
      // to solr
      sendRequest: function() {
        this.emptyQueryStrings()
            .populateFreeTextQueryString();

        this.filterCollection
            .chain()
            .groupBy(function(model){return model.get('key');})
            .each(this.addFacet, this);

        this.doRequest();
      },

      // add a Facet to the query
      addFacet: function(filterGroup, key) {
        this.setField(key);
        var queryString = _.reduce(filterGroup, this.groupFilters, '');
        this.add('(' + queryString + ')');
      },

      // reduce function to build an OR query string from filters
      groupFilters: function(queryString, model) {
        if (queryString.length > 0) {
          queryString = queryString + ' OR ';
        }
        return queryString + model.get('filterName');
      },

      // set the field for a filter
      setField: function(key) {
        if (this.field !== key) {
          this.field = key;
        }
      },

      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterSearchRequestEvents)
                 .onValue(function(value) {
                   self.queryString = value.content.raw;
                 });
      },

      // watch for the addition and removal of filters
      watchFilterEvents: function() {
        var self = this;
        searchBus.filter(function(value) {
                   return value.type === 
                     'filter_event_add_' + self.manager.entity;
                 })
                 .map(mapFilterToValue)
                 .onValue(function(value) {
                   self.filterCollection.reset(value);
                   self.sendFilter = false;
                   self.sendRequest();
                 });
      },

      
      // push results up to the search stream
      sendResults: function(searchResults) {
        pushResults(
          _.chain(searchResults)
           .filter(filterMap[this.manager.entity])
           .value(), this.manager.entity
        );
      },

      // parse the new filters from solr
      sendFilters: function(filters) {
        var fp = new ParseFilter(filters, this.manager.entity);
      },

      // process the results from solr
      afterRequest: function () {
        var searchResults = this.manager.response.response.docs,
            filters = this.manager.response.facet_counts.facet_fields;
        this.sendResults(searchResults);
        //only send new filters after a keyword search
        if (this.sendFilter) {
          this.sendFilters(filters);
        }
      }

    });

    return {
      FilterWidget: FilterWidget
    };

});

