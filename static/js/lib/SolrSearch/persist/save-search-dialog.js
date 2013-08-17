/*global define*/
// Author: Cormac McGuire
// ### Description
// Watch for save search requests and display a dialog to the user allowing
// them to set a name for the saved search

define (
  [
    'backbone', 'jquery', 
    'lib/streams',
    'lib/SolrSearch/templates/save-search-dialog'
  ],
  function (Backbone, $, Streams, saveSearchDialogTmp) {
    'use strict';
    var watchForSaveSearchRequest, init, displayDialog, searchBus,
        SaveSearchDialogView;

    searchBus = Streams.searchBus;

    init = function() {
      watchForSaveSearchRequest();
    };

    watchForSaveSearchRequest = function() {
      searchBus.toEventStream()
               .filterSaveSearchRequest()
               .onValue(displayDialog);
    };

    displayDialog = function() {
    };

    // ## Save search dialog
    //
    SaveSearchDialogView = Backbone.View.extend({
      template: saveSearchDialogTmp,
      initialize: function() {
      },
      onDestroy: function() {
      },
      render: function() {
      }
    });


    return {
      init: init
    }
});

