/*global define*/
// Author: Cormac McGuire
// ## Description
// Define mixins that are used across all our form views

define (
  [
    'jquery', 'underscore',
    'lib/streams',
    'lib/CRUD/templates/confirm-dialog.tpl'
  ],
  function ($, _, Streams, confirmDialogTmp) {
    'use strict';

    // ### ConfirmMixin
    // Show a dialog box asking the user to confirm their action
    var ConfirmMixin = {
        // display a dialog box
        // dialog confirming that you want to exit the add/update
        requestCloseForm: function() {
          var dialogHTML = $(confirmDialogTmp());
          dialogHTML.dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
              'Close Form': function() {
                Streams.searchBus.push({
                  content: {},
                  type: 'close_form'
                });
                $(this).dialog('close');
              },
              'Cancel': function() {
                $(this).dialog('close');
              }
            }
          });

        }
      },

      Formatter = {
        makeIntStringsIntegers: function(value) {
          var intValue = parseInt(value, 10);
          return intValue.toString() === value ? intValue : value;
        },

        formArrayToData: function(namedArray) {
          var keys = _(namedArray).pluck('name'),
              values = _(namedArray).chain()
                                    .pluck('value')
                                    .map(this.makeIntStringsIntegers)
                                    .value();
          return _.object(keys, values);
        }
      };

    return {
      ConfirmMixin: ConfirmMixin,
      Formatter: Formatter
    };
});

