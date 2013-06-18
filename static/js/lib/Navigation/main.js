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
'use strict';
define(
  [
    'backbone', 'underscore',
    'lib/elements/input',
    'lib/elements/combo',
    'lib/elements/dialog'
  ],
  function(Backbone, _, InputView, Combo, Dialog) {
    // create local event dispatcher
    var localDispatcher = {};
    _.extend(localDispatcher, Backbone.Events);

    var createComboBox = function() {
      var ComboCollection = new Combo.collection(Bootstrap.predefinedSearchList);

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
      ComboCollection.add(item);
    };

    var createInputView = function() {
      var inputView = new InputView({
        el: '.search',
        dispatcher: localDispatcher
      });
    };

    var createDialog = function () {
      // add the dialog
      Dialog.init('item_clicked', '#search-dialog-form');
    };

    var init = function() {
      createComboBox();
      createInputView();
      createDialog();

    };



    return {
      init: init
    };
  }
);
