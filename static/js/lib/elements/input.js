/*global window, define */
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
    'jquery', 'underscore', 'backbone', 'bacon',
    'lib/dispatcher',
    'bacon_ui',
  ],
  function ($, _, Backbone, Bacon, dispatcher) {
    'use strict';
    console.log(Bacon);
    var InputView = Backbone.View.extend({
      // declare the events that we will listen for
      events:{
        'keyup input': 'pressed',
        'click .do-clear': 'clearInput'
      },
      // create our template function
      // initialize is called when the view is instantiated
      // the element being represented is passed in when it is intialised
      initialize: function(options) {
        if (options.dispatcher !== undefined) {
          dispatcher = options.dispatcher;
        }
        this.createStream();
        dispatcher.on('clear_input', this.clearInput, this);
        this.template = _.template('<input type="textfield">');
      },
      clearInput: function() {
        this.$el.children('input').val('');
      },
      createStream: function() {
        this.textStream = Bacon.UI.textFieldValue(this.$el.children('input'))
          .map(function(inputText) {
            return {
              raw: inputText,
              encoded: window.encodeURI(inputText)
            };
          })
          .log();
      },
      // catch the keyup event
      pressed: function(e) {
        if (e.keyCode === 13) {
          this.sendText(this.$el.children('input').val());
        }
      },
      // dispatch event with contents of the input field
      sendText: function(inputText) {
        var textToSend = {
          raw: inputText,
          encoded: window.encodeURI(inputText)
        };
        dispatcher.trigger('enter_pressed', textToSend);

      },
      render: function() {
        var html = this.template();
        this.$el.append(html);
        return this;
      }
    });
    // expose our view as a module export
    return InputView;
});
