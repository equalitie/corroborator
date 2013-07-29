/*global define, AjaxSolr*/
// Author: Cormac McGuire
// ### Description
// Do search for embedded search

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/SolrSearch/solr/parse-filters',
    'core/Core',
    'core/AbstractTextWidget'
  ],
  function (Backbone, _, Streams, ParseFilter) {
    'use strict';
    var EmbeddedSearchWidget,
        crudBus = Streams.crudBus,
        filterActors = function(element) {
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
        filterCrudSearchRequestEvents = function(value) {
          return value.type === 'embedded_search';
        };

    EmbeddedSearchWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function() {
        this.watchCrudStream();
      },
      // look for search requests on the crudBus
      watchCrudStream: function() {
        var self = this;
        crudBus.toEventStream()
               .filter(filterCrudSearchRequestEvents)
               .onValue(function(value) {
                 self.clear();
                 self.set('*' + value.content.raw + '*');
                 self.doRequest();
               });
      },
      // send the results off on the crudBus
      sendResults: function() {
      },
      // called by super class
      afterRequest: function() {
        console.log('afterRequest');
        console.log(this.manager);
      }
    });
    return EmbeddedSearchWidget;
});

