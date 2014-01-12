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
    'core/AbstractTextWidget'
  ],
  function(_, ParseFilter, QueryBuilder) {
        // parse actor results from the result string
        var filterQueryBuilderEvents = function(value) {
                return value.type === 'query_builder';
            },
            filterEmbeddedSearchEvent = function(value) {
              return value.type === 'new_embedded_search';
            },
            filterSearchUpdateEvent = function(value) {
              return value.type === 'update_current_results';
            },
            filterSearchRequestEvents = function(value) {
              return value.type === 'new_search';
            },
            filterActors = function(element) {
              return element.django_ct.search(/actor/) > -1;
            },

            // parse bulletin results from the result string
            filterMedia = function(element) {
              return element.django_ct.search(/media/) > -1;
            },

            // parse bulletin results from the result string
            filterLocation = function(element) {
              return element.django_ct.search(/location/) > -1;
            },

            // parse bulletin results from the result string
            filterBulletin = function(element) {
              return element.django_ct.search(/bulletin/) > -1;
            },

            // parse incident results from the result string
            filterIncident = function(element) {
              return element.django_ct.search(/incident/) > -1;
            };


    // AJAX SOLR SEARCH WIDGET
    // TODO: listen for search event to update the search

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
        this.shouldSendResults = false;
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
      // send the results off the bus in a super functional way
      // cos that's how we do round here!
      //
      sendFilters: function(filters, options) {
        ParseFilter(filters, 'actor', options);
        ParseFilter(filters, 'bulletin', options);
        ParseFilter(filters, 'incident', options);
      },

      afterRequest: function () {
        var searchResults = this.manager.response.response.docs,
            filters = this.manager.response.facet_counts.facet_fields;
        if (this.shouldSendFilters === true) {
          var options = this.updateRequest ? {silent: true} : {};
          this.sendFilters(filters, options);
          this.updateRequest = false;
        }
      }
    });

    return ReportWidget;

});

