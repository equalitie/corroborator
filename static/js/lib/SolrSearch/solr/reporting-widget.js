/*global define*/
// Author: Cormac McGuire
// ### Description
// This file handles the main search over all three entities  
// The results of this will update collections in the Data folder
// TODO: move this to reporting module

define(
  [
    'jquery', 'underscore',
    'lib/streams',
    'lib/SolrSearch/solr/parse-filters',
    'lib/SolrSearch/solr/query-builder',
    'lib/reporting/data/graph-types',
    'core/AbstractTextWidget',
    'core/AbstractFacetWidget'
  ],
  function($, _, Streams, ParseFilter, QueryBuilder, GraphTypes) {
            
    // look for the search event
    var userGraphs = GraphTypes.userGraphs,
        filterSearchRequestEvents = function(value) {
          return value.type === 'new_search';
        },
        notUserGraph = function(value) {
          return ! userGraphs.chain()
                           .pluck('id')
                           .contains(value.content.key)
                           .value();
        },
        graphFilter = function(value) {
          return value.type === 'request_graph_data';
        };


    // SINGLE REPORT LOADER
    // build the query to load the data for each report
    var SingleReportLoaderWidget = AjaxSolr.AbstractFacetWidget.extend({
      init: function() {
        this.listenForReportRequests();
      },
      sendSearch: function(value) {
        console.log('sendSearch: ', value);
        this.graphKey = value.content.key;
        this.manager.store.remove('facet.field');
        this.manager.store.addByValue('facet.field', [value.content.key]);
        this.doRequest();
        
      },
      // listen for a request to display
      listenForReportRequests: function() {
        
        Streams.searchBus.filter(graphFilter)
                         .filter(notUserGraph)
                         .onValue(this.sendSearch.bind(this));
                         
      },
      afterRequest: function() {

        Streams.searchBus.push({
          type: 'parse_graph_data',
          content: this.manager.response.facet_counts.facet_fields[this.graphKey],
          key: this.graphKey
        });
      }
    });

    // AJAX SOLR FILTER LOADER WIDGET
    // searches across all available facets to retrieve all the filters for 
    // our graphs
    var ReportWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function (options) {
        if (this.shouldSendFilters === undefined) {
          throw 'you must specify if you want filters sent or' +
            'not after a search';
        }
        if (this.bus === undefined) {
          throw 'you must specify a communication bus for results';
        }
        this.watchSearchStream();
      },
      parseQuery: function(searchQuery) {
        var qb = new QueryBuilder(searchQuery.content.raw,
          searchQuery.content.entity);
        return qb.parsedString; 
      },

      // new search - update filters
      sendSearchRequest: function(searchQuery) {
        this.shouldSendFilters = true;
        this.sendRequest(searchQuery);
      },

      // send the request
      sendRequest: function(searchQuery) {
        this.clear();
        this.set( searchQuery );
        console.log(searchQuery);
        this.doRequest(); 
      },

      // watch for search and update search result requests
      watchSearchStream: function() {
        this.bus.filter(filterSearchRequestEvents)
                 .map(this.parseQuery)
                 .onValue(this.sendSearchRequest.bind(this));
      },

      // use the ParseFilter module to pull the filters out of the search
      // results
      sendFilters: function(filters, options) {
        console.log('sendFilters');
        ParseFilter(filters, 'actor', options);
        ParseFilter(filters, 'bulletin', options);
        ParseFilter(filters, 'incident', options);
      },

      // call back triggered after main search completes
      afterRequest: function () {
        var searchResults = this.manager.response.response.docs,
            filters = this.manager.response.facet_counts.facet_fields;
        if (this.shouldSendFilters === true) {
          this.sendFilters(filters, {});
        }
      }
    });

    return {
      ReportWidget: ReportWidget,
      SingleReportLoaderWidget: SingleReportLoaderWidget
    };

});
