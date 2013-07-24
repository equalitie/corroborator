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
    
    var CrimeCollection,
        CrimeModel,
        crimeCollection;

    // ### CrimeModel
    // relates to an individual source
    CrimeModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/crime/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    CrimeCollection = Backbone.Collection.extend({
      model: CrimeModel,
      initialize: function() {
        this.reset(Bootstrap.crimes);
        this.on('add', this.addToBootstrap, this);
        this.on('remove', this.removeFromBootstrap, this);
      },

      // map a list of models to autocomplete format
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },

      // convert single model to format expected by jquery ui autocomplete
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('name_en'),
          id   : model.get('id')
        };
      },

      // TODO allow users to add their own crimes via these methods
      addToBootstrap: function(model) {
      },
      removeFromBootstrap: function(model) {
      },
    });
    crimeCollection = new CrimeCollection();
    



    return {
      CrimeModel: CrimeModel,
      CrimeCollection: CrimeCollection,
      CrimeCollectionInstance: crimeCollection
    };
});



