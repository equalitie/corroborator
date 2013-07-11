/*global define, AjaxSolr*/
// Author: Cormac McGuire
// ### Description
// provide a filter widget that allows for filtering based on the filters
// returned from the original solr search

define(
  [
    'lib/streams',
    'core/Core',
    'core/AbstractFacetWidget'
  ], 
  function(Streams) {
    'use strict';
    var FilterWidget,
        searchBus = Streams.searchBus,
        navBus    = Streams.navBus;

    var filterFilterEvents = function(value) {
      return value.type === 'filter_event';
    };
    var mapFilterToValue = function(value) {
      return value.content;
    };

    // ## Create a widget to send / receive filtered searches to/from solr
    FilterWidget = AjaxSolr.AbstractFacetWidget.extend({

      // start our event listeners
      init: function(){
        this.watchFilterEvents();
        this.watchNavEvents();

        //this.doRequest();
      },

      // add a Facet to the query
      addFacet: function(value) {
        this.field = value.field;
        this.add(value.filter);
      },

      watchNavEvents: function() {
      },
      watchFilterEvents: function() {
        var self = this;
        searchBus.filter(filterFilterEvents)
                 .map(mapFilterToValue)
                 .onValue(function(value) {
                   self.addFacet(value);
                   self.doRequest();
                 });
      },

      
      beforeRequest: function() {
      },


      // process the results from solr
      afterRequest: function () {
      }

    });

    return {
      FilterWidget: FilterWidget
    };

});

