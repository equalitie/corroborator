/**
 * Test suite for our event dispatcher
 */
define(
  ['lib/dispatcher'],
  function(dispatcher) {
    var assert = buster.assert;
    buster.testCase('Event dispatcher tests', {
      setUp: function() {
      },
      'dispatcher should return a module': function() {
        assert.equals(typeof(dispatcher.on), 'function');
      },
      'dispatcher should trigger and listen to an event with parameters': function(done) {
        var sendObject = {
          test: 'test'
        };
        dispatcher.on('test_event', done(function(receiveObject) {
          assert.equals(sendObject, receiveObject);
        }));
        dispatcher.trigger('test_event', sendObject);
      }
    });
    
  }
);
