/*global define*/
/**
 * Test that our router works as expected
 */
define(
  [
    'backbone',
    'lib/Navigation/TabRouter',
    'lib/streams'
  ],
  function(Backbone, TabRouter, Streams) {
    var bus = Streams.navBus;
    buster.testCase('Router testing', {
      setUp: function() {
        this.tabRouter = TabRouter.init();
      },

      tearDown: function() {
        Backbone.history.stop();
      },

      'it should return an init function': function() {
        assert.equals(typeof(TabRouter.init), 'function');
      },

      'it should dispatch a navigate event when a link is clicked': 
      function(done) {
        bus.toEventStream().take(1).onValue(done(function (value) {
          assert.equals(value, 'incident');
        }));
        this.tabRouter.navigate('tab/incident', {trigger: true});
      }
    });
  }
);
