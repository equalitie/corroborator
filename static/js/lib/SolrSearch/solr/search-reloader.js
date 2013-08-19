/*global define, window, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Listen for a search request and pass it on, start a timer that fires the
// search request periodically

define (
  [
    'lib/streams', 'jquery'
  ],
  function (Streams, $) {
    'use strict';

    var searchBus = Streams.searchBus, intervalId,
        init, listenForSearchEvents, updateSearchValue, mapToSearchObject,
        restartTimer, sendSearches, filterSearchUpdateRequest, 
        filterSearchStringRequest, listenForSearchStringRequest,
        triggerInitialSearch, sendSearchString, pollForUpdates, getApiUrl,
        currentSearchObject;

    currentSearchObject = {
      content: {
        encoded: '',
        raw: ''
      }
    };
    // send the initial search that will populate our application
    triggerInitialSearch = function() {
      searchBus.push({
        type: 'search_updated',
        content: {
          raw: '',
          encoded: ''
        }
      });
    };

    // filter search text updates
    filterSearchUpdateRequest = function(value) {
      return value.type === 'search_updated';
    };

    // listen on the search bus for new search events
    listenForSearchEvents = function() {
      searchBus.toEventStream()
               .filter(filterSearchUpdateRequest)
               .map(mapToSearchObject)
               .onValue(updateSearchValue);
    };
    filterSearchStringRequest = function(value) {
      return value.type === 'search_string_request';
    };

    // listen for a search string request
    listenForSearchStringRequest = function() {
      searchBus.toEventStream()
               .filter(filterSearchStringRequest)
               .onValue(sendSearchString);
    };

    // send back the current search string
    sendSearchString = function(value) {
      searchBus.push({
        type: 'search_string_result_' + value.content.key,
        content: {
          searchString: currentSearchObject.content.encoded
        }
      });
    };

    // map stream content to search object
    mapToSearchObject = function(value) {
      return {
        content: value.content,
        domain: value.domain
      };
    };
 
    // new search received update the search object
    updateSearchValue = function(searchObject) {
      sendSearches(searchObject, true);
      currentSearchObject = searchObject;
    };

    getApiUrl = function() {
      var url = '/api/v1/solrUpdate/';
      var urlvars = "?format=json&username=" +
      Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
      return url + urlvars;
    };
  
    pollForUpdates = function(searchObject) {
      var success = function(response) {
        console.log(response);
      };
      var error = function() {
        console.log('error', arguments);
      };
      $.ajax({
        url : getApiUrl(),
        success: success
      });
    };

    // send the search object - check for restart
    sendSearches = function(searchObject, isRestartRequired) {
      var search_type = 'update_current_results';
      if (isRestartRequired) {
        search_type = restartTimer(searchObject);
      }
      searchBus.push({
        type: search_type,
        content: searchObject.content,
        domain: searchObject.domain
      });
    };
 
    // restart the timer that periodically resends the search
    restartTimer = function(searchObject) {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(pollForUpdates, 5000, searchObject, false);
      return 'new_search';
    };
 
    init = function() {
      listenForSearchStringRequest();
      listenForSearchEvents();
      triggerInitialSearch();
    };

    return { 
      init: init
    };
});

