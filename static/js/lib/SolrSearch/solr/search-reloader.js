/*global define, window*/
// Author: Cormac McGuire
// ### Description
// Listen for a search request and pass it on, start a timer that fires the
// search request periodically

define (
  [
    'lib/streams'
  ],
  function (Streams) {
    'use strict';

    var searchBus = Streams.searchBus, intervalId,
        init, listenForSearchEvents, updateSearchValue, mapToSearchObject,
        restartTimer, sendSearches, filterSearchUpdateRequest,
        triggerInitialSearch;

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

    // listen on the search bus for new search events
    listenForSearchEvents = function() {
      searchBus.toEventStream()
               .filter(filterSearchUpdateRequest)
               .map(mapToSearchObject)
               .onValue(updateSearchValue);
    };
 
    // filter search text updates
    filterSearchUpdateRequest = function(value) {
      return value.type === 'search_updated';
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
      intervalId = window.setInterval(sendSearches, 5000, searchObject, false);
      return 'new_search';
    };
 
    init = function() {
      listenForSearchEvents();
      triggerInitialSearch();
    };

    return { 
      init: init
    };
});

