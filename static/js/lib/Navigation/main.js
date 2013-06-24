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
    'underscore',
    'lib/elements/input',
    'lib/Navigation/NavCombo',
    'lib/elements/dialog',
    'lib/Navigation/TabRouter',
    'lib/streams'
  ],
  function(_, InputView, NavCombo, Dialog, TabRouter, Streams) {
    'use strict';
    var textEntered,
        textProperty;

    // create our combo box view
    var createComboBox = function() {
      var Comboview = new NavCombo.view({
        el: '.search-combo',
        primary: {
          name_en: 'Search',
          search_request: 'search_request'
        }
      });
      // add the save item
      Comboview.render();
    };

    var nonEmpty = function(x) {
      console.log(x.encoded);
      return x.encoded.length > 0;
    };
    //var and

    // create the input view that will read in a search from the user
    var createInputView = function () {
      var inputView = new InputView({
        el: '.search',
      });
      textEntered = inputView.textProperty.map(nonEmpty);
      textProperty = inputView.textProperty;
    };

    var watchForSearch = function() {
      var searchRequested = Streams.searchBus.filter(function(e){
        return e.type === 'search_request';
      })
      .map(function(e) {
        return {
          search_request: e.type === 'search_request'
        };
      });

      var merged = searchRequested.merge(textProperty.toEventStream());
      var navStream = Streams.navBus.toEventStream().map(function(value) {
        return {
          domain: value
        };
      });
      merged = merged.merge(navStream);

      merged.scan({}, function(oldResult, value) {
        var newResult = oldResult;
        if (value.encoded) {
          newResult.search = value;
          newResult.type = 'intermediate';
        }
        if (value.domain) {
          newResult.domain = value.domain;
          newResult.type = 'intermediate';
        }
        if (value.search_request === true) {
          newResult.type = 'new_search';
        }
        return newResult;
         
      }).filter(function(value) {
        return value.type === 'new_search' && value.search !== undefined;
      }).onValue(function(value) {
        Streams.searchBus.push(value);
      });
    };

    // create the dialog that we will use to save a user's search
    var createDialog = function () {
      Dialog.init('item_clicked', '#search-dialog-form');
    };

    // init function used to instantiate the objects required to get 
    // things running
    var init = function () {
      createComboBox();
      createInputView();
      watchForSearch();
      TabRouter.init();
      createDialog();
    };

    return {
      init: init
    };
  }
);
