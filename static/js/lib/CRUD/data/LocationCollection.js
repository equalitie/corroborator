/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Collection to hold sources

define (
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';
    
    var LocationCollection,
        LocationModel,
        locationCollection;

    // ### LocationModel
    // relates to an individual source
    LocationModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/location/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    LocationCollection = Backbone.Collection.extend({
      model: LocationModel,
      initialize: function() {
        this.reset(Bootstrap.locations);
      },

      // map a list of models to autocomplete format
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },

      // convert single model to format expected by jquery ui autocomplete
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('name_en'),
          id   : model.get('resource_uri')
        };
      }

    });

    return {
      LocationModel: LocationModel,
      LocationCollection: LocationCollection
    };
});

