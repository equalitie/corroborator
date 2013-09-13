/*global define*/
// Author: Cormac McGuire
// ### Description
// show/hide search activity spinner

define (
  [
    'jquery',
    'lib/streams'
  ],
  function ($, Streams) {
    'use strict';
    var activityView, init, searchRequestFilter, searchCompleteFilter,
        createTypeFilter, searchBus;

    createTypeFilter = Streams.filterLib.createTypeFilter;
    searchBus = Streams.searchBus;

    searchRequestFilter = createTypeFilter('search_request');
    searchCompleteFilter = createTypeFilter('results_incident');

    activityView = function() {
      this.listenForSearchRequest();
      this.listenForSearchComplete();
    };
    activityView.prototype = {
      listenForSearchRequest:function() {
        searchBus.filter(searchRequestFilter)
                 .onValue(this.showActivitySpinner.bind(this));
      },
      listenForSearchComplete:function() {
        searchBus.filter(searchCompleteFilter)
                 .onValue(this.hideActivitySpinner.bind(this));
      },
      showActivitySpinner: function() {
        $('.searching img').show();
      },
      hideActivitySpinner: function() {
        $('.searching img').hide();
      }
    };

    init = function () {
      return new activityView();
    };

    return {
      init: init
    };

});


