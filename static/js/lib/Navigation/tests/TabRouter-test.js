/*global define*/
/**
 * Test that our router works as expected
 */
define(
  [
    'backbone',
    'lib/Navigation/TabRouter',
    'lib/dispatcher'
  ],
  function(Backbone, TabRouter, dispatcher) {
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

      'it should dispatch a navigate event when a link is clicked': function(done) {
        dispatcher.on('navigate_incidents', done(function() {
          assert.equals(true, true);
        }));
        this.tabRouter.navigate('tab/incidents', {trigger: true});
      }
    });
  }
);
