define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {
    'use strict';
    var extractResults = function(value) {
      return value.content;
    };

    var filterIncidentResults = function(value) {
      return value.type === 'results_incident';
    };

    var IncidentModel = Backbone.Model.extend({
      idAttribute: 'django_id'
    });

    var IncidentCollection = Backbone.Collection.extend({
      model: IncidentModel,
      initialize: function() {
        this.watchEventStream();
      },
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterIncidentResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      }

    });

  return {
    IncidentModel: IncidentModel,
    IncidentCollection: IncidentCollection
  };


});

