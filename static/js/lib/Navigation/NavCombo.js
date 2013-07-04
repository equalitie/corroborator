/*global window, define, Bacon, Bootstrap */
// Author: Cormac McGuire  
// ### combo
// represent the combo box in the navigation area
// 
// collection contains the elements to be displayed can be filtered based on 
// current tab
// 

define(
  [
    // vendor
    'jquery', 'underscore', 'backbone',
    'bacon',
    //
    'lib/streams',
    // local libs
    'lib/elements/combo'
  ],
  function ($, _, Backbone, Bacon, Streams, Combo) {
    'use strict';
    var Collection = Backbone.Collection.extend();
    var localBus = new Bacon.Bus();

    var isSearchRequest = function(value) {
      var model = value.content;
      return model.get('type') === 'search';
    };
    var isComboAction = function(value) {
      return value.type === 'nav_combo';
    };
    var isSavedSearch = function(value) {
      var model = value.content;
      return model.get('type') === 'actor' ||
             model.get('type') === 'incident' ||
             model.get('type') === 'bulletin';
    };

    var isSaveSearchRequest = function(value) {
      var model = value.content;
      return model.get('type') === 'default';
    };

    var dispatchSavedSearch = function (value) {
      var model = value.content;
      Streams.searchBus.push({
        type: 'saved_search',
        content: model
      });
    };

    var dispatchSaveSearchRequest = function (value) {
      var model = value.content;
      Streams.searchBus.push({
        type: 'save_search_request',
        content: model
      });
    };
    var dispatchSearchRequest = function (value) {
      var model = value.content;
      Streams.searchBus.push({
        type: 'search_request',
        content: model
      });
    };

    // send saved search events to the main search bus
    localBus.toProperty()
            .filter(isComboAction)
            .filter(isSavedSearch)
            .onValue(dispatchSavedSearch);

    // send save current search request to the main search bus
    localBus.toProperty()
            .filter(isComboAction)
            .filter(isSaveSearchRequest)
            .onValue(dispatchSaveSearchRequest);

    // send search request to the main bus
    localBus.toProperty()
            .filter(isComboAction)
            .filter(isSearchRequest)
            .onValue(dispatchSearchRequest);

    /**
     * check if the element is a new search
     */
    var isSearch = function(value) {
      return value.type === 'new_search';
    };

    /**
     * create the full collection of items to initialise our collection
     * we add the save search item in here
     */
    var createFullCollection = function() {
      var fullCollection = new Collection(Bootstrap.predefinedSearchList);
      var item = {
        name_en: 'Save current search...',
        search_request: 'save_search',
        type: 'default'
      };
      fullCollection.add(item);
      return fullCollection;
    };


    // ## NavComboView
    // This is a subclass for the combo view from combo.js
    //
    var NavComboView = Combo.View.extend({
      filteredCollection: undefined,
      eventIdentifier: 'nav_combo',

      // init the view setting the default item if provided
      initialize: function(options) {
        this.fullCollection = createFullCollection();
        this.collection = this.fullCollection.clone();
        options.bus = localBus;
        Combo.View.prototype.initialize.call(this, options);
        this.handleNavigation();
        this.handleAddSearch();
      },

       // register a handler for navigation events
      handleNavigation: function() {
        Streams.navBus.toProperty()
            .onValue(this.updateCollection, this);
      },

       // this function is called in response to a navigate event being pushed
      updateCollection: function(context, value) {
        var self = context,
            models,
            filterFunction;

        filterFunction = function (model) {
          var type = model.get('type');
          return type === value || type === 'default';
        };

        models = self.fullCollection.filter(filterFunction);
        self.collection.reset(models);
      },

      // filter search events of type new_search  
      // this adds new searches to the combo box  
      // TODO - handle saving the search  
      //
      handleAddSearch: function() {
        var self = this;
        Streams.searchBus.toEventStream().toProperty()
          .filter(isSearch)
          .onValue(function(value) {
            self.fullCollection.add(value.search, { at: self.fullCollection.length - 1 });
            self.collection.add(value.search, { at: self.collection.length - 1 });
        });
        window.searchBus = Streams.searchBus;
      }

    });

    // expose our view as a module export
    return {
      View: NavComboView,
      Collection: Collection
    };
});

