/*global define, Bootstrap */
/**
### main

main entry point for the Navigation module 
We will define and manage events from the various components within this section

bacon.js EventStreams are used to build more functionality into our events
Certain events must happen in combination before they are propogated
For example:
To search, the user must have entered text into the input box
and press the search button

To save the search requires the similar requirements

Save Search, Search and tab events will be propogated around the whole application

A module level event dispatcher is created and passed to all modules referenced here. 
In this way we can ensure events do not leak between our main modules


*/
define(
  [
    'backbone', 'underscore',
    'lib/elements/input',
    'lib/elements/combo',
    'lib/elements/dialog',
    'lib/Navigation/TabRouter'
  ],
  function(Backbone, _, InputView, Combo, Dialog, TabRouter) {
  'use strict';
    // create local event dispatcher
    var localDispatcher,
        searchTextfieldProperty,
        comboBoxProperty,
        existingSearchEventStream;

    // create a local event dispatcher that will be used for 
    // events triggered within the Navigation structure
    var createLocalDispatcher = function() {
      localDispatcher = {};
      _.extend(localDispatcher, Backbone.Events);
    };

    // create our combo box view
    var createComboBox = function() {
      var ComboCollection = 
        new Combo.collection(Bootstrap.predefinedSearchList);

      var Comboview = new Combo.view({
        element: '.search-combo',
        collection: ComboCollection,
        dispatcher: localDispatcher,
        primary: {
          name_en: 'Search',
          search_request: 'search_request'
        }
      });
      // add the save item
      var item = {
        name_en: 'Save current search...',
        search_request: 'save_search'
      };
      Comboview.render();
      comboBoxProperty = Comboview.property;
      ComboCollection.add(item);
    };

    // create the input view that will read in a search from the user
    var createInputView = function () {
      var inputView = new InputView({
        el: '.search',
        dispatcher: localDispatcher
      });
      searchTextfieldProperty = inputView.textProperty;
    };

    // create the dialog that we will use to save a user's search
    var createDialog = function () {
      // add the dialog
      Dialog.init('item_clicked', '#search-dialog-form');
    };

    var processSearch = function (val1, val2) {
      console.log(val1, val2);
    };

    var registerSearchStreams = function() {
      var searchProperty = searchTextfieldProperty.combine(comboBoxProperty, processSearch);
      console.log(searchProperty);
      searchProperty.log();
    };


    // init function used to instantiate the objects required to get 
    // things running
    var init = function () {
      createLocalDispatcher();
      createComboBox();
      createInputView();
      registerSearchStreams();
      createDialog();
      TabRouter.init();
    };

    return {
      init: init
    };
  }
);
