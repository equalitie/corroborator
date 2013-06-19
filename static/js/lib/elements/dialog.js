/*global define */
/**
### input
represent an input field, reacts to the enter button being pressed
when focus is on the input by sending the content of the input box
in the enter_pressed event

When creating an instance of the view, you can either pass in the element to watch
or have one rendered.
you may also pass a custom event dispatcher which will be used instead of the 
global dispatcher for sending events

TODO: define template for the view
*/
define(
  [
    'jquery', 'jquery_ui',
    'lib/dispatcher',
  ],
  function ($, jquery_ui, dispatcher) {
    'use strict';
    // stores a ref to the dialog dom element
    var dialogElement;

    // called when the dialog Save button is pressed
    var handleSaveSearch = function() {
      $(dialogElement).dialog('close');
    };

    // called when the dialog Cancel button is pressed
    var handleClose = function() {
      $(dialogElement).dialog('close');
    };

    var resetError = function() {};

    // open the dialog
    var openDialog = function () {
      $(dialogElement).dialog('open');
    };

    var createDialog = function () {
      $(dialogElement).dialog({
        autoOpen: false,
        height: 200,
        width: 350,
        modal: true,
        buttons: {
          'Save Search': handleSaveSearch,
          'Cancel': handleClose
        },
        close: resetError
      });
    };

    var init = function (openEvent, dialogId) {
      dialogElement = dialogId;
      console.log(openEvent);
      dispatcher.on(openEvent, openDialog);
      createDialog();
    };


    // expose our init function as a module export
    return {
      init: init
   };
});


