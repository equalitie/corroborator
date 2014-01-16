/*global define*/
// Author: Cormac McGuire
// ### Description
// This file handles the main search over all three entities  
// The results of this will update collections in the Data folder

define(
  [
    'underscore',
    'lib/SolrSearch/solr/parse-filters',
    'lib/SolrSearch/solr/query-builder',
    'core/AbstractTextWidget',
    'core/AbstractFacetWidget'
  ],
  function(_, ParseFilter, QueryBuilder) {
            
    // look for the search event
    var filterSearchRequestEvents = function(value) {
          return value.type === 'new_search';
        };


    // SINGLE REPORT LOADER
    // build the query to load the data for each report
    var SingleReportLoaderWidget = AjaxSolr.AbstractFacetWidget.extend({
      init: function() {
      },
      // listen for a request to display
      listenForReportRequests: function() {
      },
      afterRequest: function() {
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

    return ReportWidget;

});
