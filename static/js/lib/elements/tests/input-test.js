/**
 * Test suite for our event dispatcher
 */
define(
  ['lib/elements/input', 'jquery', 'lib/dispatcher'],
  function(InputView, $, dispatcher) {
    var assert = buster.assert;
    buster.testCase('input box tests', {
      setUp: function() {
        $(document.body).append(
          '<div class="input-view"><input type="textfield"></div>');
        this.inputView = new InputView({
          element: '.input-view'
        });
        
      },
      tearDown: function() {
        $('.input-view').remove();
        dispatcher.off('enter_pressed');
      },
      'InputView should return a module': function() {
        assert.equals(typeof(InputView), 'function');
      },
      'clearInput should remove text from the input field': function() {
        $('input').val('hello');
        this.inputView.clearInput();
        assert.equals($('input').val(), '');
      },
      'pressing return should trigger enter_pressed event': function(done) {
        $('input').val('hello');
        var evt = $.Event('keyup');
        evt.which = 13;
        evt.keyCode = 13;
        dispatcher.on('enter_pressed', done(function(textSent) {
          assert.equals('hello', textSent.raw);
        }));
        $('input').trigger(evt);
      },
      'the text should be urlencoded': function(done) {
        var text = 'text to send';
        dispatcher.on('enter_pressed', done(function (textSent) {
          assert.equals(encodeURI(text), textSent.encoded);
        }));
        this.inputView.sendText(text);
      },
    });
    
  }
);

