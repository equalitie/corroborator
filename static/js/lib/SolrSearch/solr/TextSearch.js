/*global define*/
// Author: Cormac McGuire
// ### Description
// This file handles the main search over all three entities  
// The results of this will update collections in the Data folder

define(
  [
    'underscore',
    'lib/SolrSearch/solr/parse-filters',
    'lib/streams',
    'core/AbstractTextWidget'
  ],
  function(_, ParseFilter, Streams) {
        // parse actor results from the result string
        var filterActors = function(element) {
          return element.django_ct.search(/actor/) > -1;
        },

        // parse bulletin results from the result string
        filterBulletin = function(element) {
          return element.django_ct.search(/bulletin/) > -1;
        },

        // parse incident results from the result string
        filterIncident = function(element) {
          return element.django_ct.search(/incident/) > -1;
        },

        // send the results off to the search bus
        pushActorResults = function(actors) {
          Streams.searchBus.push({
            type: 'results_actor',
            content: actors
          }); 
        },
        pushBulletinResults = function(bulletins) {
          Streams.searchBus.push({
            type: 'results_bulletin',
            content: bulletins
          }); 
        },
        pushIncidentResults = function(incidents) {
          Streams.searchBus.push({
            type: 'results_incident',
            content: incidents
          }); 
        };

    // AJAX SOLR SEARCH WIDGET
    // TODO: listen for search event to update the search

    var TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function () {
        
      },
      // send the results off the bus in a super functional way
      // cos that's how we do round here!
      //
      sendResults: function(searchResults) {
        
        pushActorResults(
          _.chain(searchResults)
           .filter(filterActors)
           .value()
        );

        pushBulletinResults(
          _.chain(searchResults)
           .filter(filterBulletin)
           .value()
        );
         
        pushIncidentResults(
          _.chain(searchResults)
           .filter(filterIncident)
           .value()
        );
      },
      sendFilters: function(filters) {
        ParseFilter(filters);
      },

      afterRequest: function () {
        var searchResults = this.manager.response.response.docs,
            filters = this.manager.response.facet_counts.facet_fields;
        this.sendResults(searchResults);
        this.sendFilters(filters);
      }
    });

    return TextWidget;

});

