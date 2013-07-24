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
    
    var SourceCollection,
        SourceModel,
        sourceCollection;

    // ### SourceModel
    // relates to an individual source
    SourceModel = Backbone.Model.extend({
      
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/source/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });
    
    SourceCollection = Backbone.Collection.extend({
      model: SourceModel,
      initialize: function() {
        this.reset(Bootstrap.sources);
        this.on('add', this.addToBootstrap, this);
        this.on('remove', this.removeFromBootstrap, this);
      },
      autoCompleteFormat: function() {
        return this.map(this.mapAutoCompleteFormat);
      },
      mapAutoCompleteFormat: function(model) {
        return {
          label: model.get('name_en'),
          id   : model.get('id')
        };
      },
      addToBootstrap: function(model) {
      },
      removeFromBootstrap: function(model) {
      },
    });
    sourceCollection = new SourceCollection();
    



    return {
      SourceModel: SourceModel,
      SourceCollection: SourceCollection,
      SourceCollectionInstance: sourceCollection
    };
});



