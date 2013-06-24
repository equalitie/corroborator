/*global window, define, Bacon, Bootstrap */
/**
### combo
represent the combo box in the navigation area

collection contains the elements to be displayed
can be filtered based on 

When creating an instance of the view, you can either pass in the element to watch
or have one rendered.



you may also pass a custom event dispatcher which will be used instead of the 
global dispatcher for sending events

TODO: define template for the view
*/
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
    var collection = Backbone.Collection.extend();
    var localBus = new Bacon.Bus();

    var isSearchRequest = function(model) {
      return model.get('type') === 'search';
    };
    var isSavedSearch = function(model) {
      return model.get('type') === 'actor' ||
             model.get('type') === 'incident' ||
             model.get('type') === 'bulletin';
    };

    var isSaveSearchRequest = function(model) {
      return model.get('type') === 'default';
    };

    var dispatchSavedSearch = function (model) {
      Streams.searchBus.push({
        type: 'saved_search',
        value: model
      });
    };

    var dispatchSaveSearchRequest = function (model) {
      Streams.searchBus.push({
        type: 'save_search_request',
        value: model
      });
    };
    var dispatchSearchRequest = function (model) {
      Streams.searchBus.push({
        type: 'search_request',
        value: model
      });
    };

    // send saved search events to the main search bus
    localBus.toProperty().filter(isSavedSearch).onValue(dispatchSavedSearch);

    // send save current search request to the main search bus
    localBus.toProperty().filter(isSaveSearchRequest).onValue(dispatchSaveSearchRequest);

    // send search request to the main bus
    localBus.toProperty().filter(isSearchRequest).onValue(dispatchSearchRequest);

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
      var fullCollection = new collection(Bootstrap.predefinedSearchList);
      var item = {
        name_en: 'Save current search...',
        search_request: 'save_search',
        type: 'default'
      };
      fullCollection.add(item);
      return fullCollection;
    };


    // ## Combo view
    var NavComboView = Combo.view.extend({
      filteredCollection: undefined,

      // init the view setting the default item if provided
      initialize: function(options) {
        this.fullCollection = createFullCollection();
        this.collection = this.fullCollection.clone();
        options.bus = localBus;
        Combo.view.prototype.initialize.call(this, options);
        this.handleNavigation();
        this.handleAddSearch();
      },

      /**
       * register a handler for navigation events
       */
      handleNavigation: function() {
        Streams.navBus.toProperty()
            .onValue(this.updateCollection, this);
      },

      /**
       * this function is called in response to a navigate event being pushed
       */
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

      /**
       * filter search events of type new_search
       * this adds new searches to the combo box
       * TODO - handle saving the search
       */
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
      view: NavComboView,
      collection: collection
    };
});

