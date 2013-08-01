/*global define*/
// Author: Cormac McGuire
// ### Description
// This file handles the main search over all three entities  
// The results of this will update collections in the Data folder

define(
  [
    'underscore',
    'lib/SolrSearch/solr/parse-filters',
    'core/AbstractTextWidget'
  ],
  function(_, ParseFilter) {
        // parse actor results from the result string
        var bus,
            filterSearchRequestEvents = function(value) {
              return value.type === 'new_search';
            },
            filterActors = function(element) {
              return element.django_ct.search(/actor/) > -1;
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
            },

            // send the results off to the search bus
            pushActorResults = function(actors) {
              bus.push({
                type: 'results_actor',
                content: actors
              }); 
            },
            pushBulletinResults = function(bulletins) {
              bus.push({
                type: 'results_bulletin',
                content: bulletins
              }); 
            },
            pushLocationResults = function(locations) {
              bus.push({
                type: 'results_location',
                content: locations
              }); 
            };
            pushIncidentResults = function(incidents) {
              bus.push({
                type: 'results_incident',
                content: incidents
              }); 
            };

    // AJAX SOLR SEARCH WIDGET
    // TODO: listen for search event to update the search

    var TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function (options) {
        if (this.shouldSendFilters === undefined) {
          throw 'you must specify if you want filters sent or' +
            'not after a search';
        }
        if (this.bus === undefined) {
          throw 'you must specify a communication bus for results';
        }
        bus = this.bus;
        this.watchSearchStream();
        
      },
      watchSearchStream: function() {
        var self = this;
        bus.filter(filterSearchRequestEvents)
                 .onValue(function(value) {
                   self.clear();
                   self.set('*' + value.content.raw + '*');
                   self.doRequest();
                 });
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
         
        pushLocationResults(
          _.chain(searchResults)
           .filter(filterLocation)
           .value()
        );
      },
      sendFilters: function(filters) {
        ParseFilter(filters, 'actor');
        ParseFilter(filters, 'bulletin');
        ParseFilter(filters, 'incident');
      },

      afterRequest: function () {
        var searchResults = this.manager.response.response.docs,
            filters = this.manager.response.facet_counts.facet_fields;
        this.sendResults(searchResults);
        if (this.shouldSendFilters === true) {
          this.sendFilters(filters);
        }
      }
    });

    return TextWidget;

});

