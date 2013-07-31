/*global define*/
// Author: Cormac McGuire
// ### Description
// Search for locations, provide display of selected locations and select element
// to store them for the containing form

define (
  [
    'jquery', 'backbone', 'underscore', 'lib/streams',
    'lib/elements/select-option',
    'lib/Data/location',
    'lib/CRUD/views/search-views/location/location-result',
    'lib/CRUD/templates/location-search-field.tpl'
  ],
  function ($, Backbone, _, Streams, SelectOptionView, Location, LocationResult,
    locationSearchTmp) {
    'use strict';
    var LocationSearchView,
        crudBus = Streams.crudBus,
        filterLocationResults = function(value) {
          return value.type === 'results_location';
        },
        filterLocationUpdateRelationship = function(value) {
          return value.type === 'update_location_relationship_request';
        },
        filterLocationRelateRequest = function(value) {
          return value.type === 'relate_location_request';
        };

    // ### LocationSearchView
    // Search for locations and display locations already associated with and entity
    // allows for adding of search results
    LocationSearchView = Backbone.View.extend({
      childViews: [],
      unsubFunctions: [],
      events: {
        'click .do-search': 'searchLocationsRequested',
        'click .do-clear' : 'clearSearchRequested'
      },
      template: locationSearchTmp,
      locationCollection: undefined,
      renderCollection: undefined,
      // constructor
      // pass in collection of existing Locations related to this entity
      // or create a new one
      initialize: function() {
        if (this.collection === undefined) {
          this.collection = new Backbone.Collection();
        }
        this.collection.on('reset add remove', this.renderLocations, this);
        this.collection.on('reset add remove', this.renderSelectOptions, this);
        this.listenForLocationsAdded();
        this.render();
      },

      requestAvailableLocations: function(inputText) {
        var searchText = inputText !== undefined ? inputText : '';
        // send a search request - handled in TextSearch
        crudBus.push({
          type: 'new_search',
          content: {
            raw: searchText
          }
        });
      },

      // turn off event listeners and remove dom elements
      destroy: function() {
        this.collection.off('reset add remove', this.renderLocations, this);
        this.collection.off('add remove', this.renderSelectOptions, this);
        this.collection = undefined;
        this.destroySelectViews();
        this.destroyChildViews();
        this.unsubStreams();
        this.$el.remove();
        this.undelegateEvents();
      },

      // user clicked search
      searchLocationsRequested: function(evt) {
        evt.preventDefault();
        // get the text from the search box
        var inputText = this.$el.children('.search').children('input').val();
        this.requestAvailableLocations(inputText);
        // opent the location results box
        crudBus.push({
          type: 'location-results',
          content: {}
        });
      },

      // clear the input box
      clearSearchRequested: function(evt) {
        evt.preventDefault();
        $(evt.currentTarget).siblings('input').val('');
      },

      // listen for the list of all available locations, used to populate the
      // added locations data
      listenForAvailableLocations: function() {
        var self = this;
        var subscriber =
          crudBus.toEventStream()
                 .filter(filterLocationResults)
                 .subscribe(function(evt) {
                   var value = evt.value();
                   self.locationCollection.reset(value.content);
                 });
       this.unsubFunctions.push(subscriber);
      },

      // listen for an event specifying the location who has been added
      listenForLocationsAdded: function() {
        var subscriber = 
          crudBus.toEventStream()
                 .filter(filterLocationRelateRequest)
                 .subscribe(this.attachLocation.bind(this));
       this.unsubFunctions.push(subscriber);
      },

      attachLocation: function(evt) {
        var locationModel = evt.value().content.model,
            existingLocation = this.existingLocation(locationModel);
        if (existingLocation === undefined) { // create location
          this.collection.add(locationModel);
        }
      },


      // check if the location is already associated with this entity
      existingLocation: function(locationModel) {
        return this.collection
                   .chain()
                   .filter(function(model) { 
                      return model.get('id') === locationModel.get('id');
                   })
                   .last()
                   .value();
      },


      // render the multiple select box 
      renderSelectOptions: function() {
        this.destroySelectViews();
        this.collection.each(this.addToSelectList, this);
        return this;
      },

      // add a selected option to the hidden select element
      addToSelectList: function(model) {
        var selectOptionView = new SelectOptionView({
          model: model
        });
        this.$el.children('select')
                .append(selectOptionView.$el);
        this.selectViews.push(selectOptionView);
      },

      // destroy the displayed location views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // destroy the select option views
      destroySelectViews: function() {
        _.invoke(this.selectViews, 'destroy');
        this.selectViews = [];
      },

      // unsubscribe from bacon event streams
      unsubStreams: function() {
        _.each(this.unsubFunctions, function(unsub) {
          unsub();
        });
        this.unsubFunctions = [];
      },

      // render the related locations
      renderLocations: function() {
        this.destroyChildViews();
        this.collection.each(this.renderLocation, this);
      },

      // render a single location
      renderLocation: function(model) {
        var resultView = new LocationResult({
          model: model,
          collection: this.collection,
          type: 'selected'
        });
        this.childViews.push(resultView);
        this.$el.children('ul').append(resultView.$el);
      },

      //render the input field and buttons
      render: function() {
        var html = this.template();
        this.$el.empty()
                .append(html);
      }
    });
    return LocationSearchView;
});
