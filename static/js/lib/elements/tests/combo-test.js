/**
 * Test suite for our combo view
 */
define(
  ['lib/elements/combo', 'jquery', 'lib/dispatcher'],
  function(Combo, $, dispatcher) {
    var assert = buster.assert;
    buster.testCase('Combo box tests', {
      setUp: function() {
        $(document.body).append('<div class=\'search-combo\'></div>');
        this.collection = new Combo.collection();
        this.view = new Combo.view({ 
          element: '.search-combo',
          primary: {
            label: 'Search',
            eventLabel: 'search'
          }
        });
        this.view.render();
        $(document.body).append(this.view.$el);

      },
      tearDown: function() {
      },
      'it should return a module containing a collection and a view': function() {
        assert.equals(typeof(Combo), 'object'); 
        assert.equals(typeof(Combo.collection), 'function');
        assert.equals(typeof(Combo.view), 'function');
      },
      'the view should accept a primary function for the combo box': function() {
        assert.equals($('.combo-main').text(), 'Search');
      },
      'the view should dispatch the search event when clicked': function(done) {
        dispatcher.on('search_requested', done(function() {
          assert.equals(true, true);
        }));
        $('.combo-main').click();
      },
      'the view should render a list of predefined searches': function() {
      },
    });
    
  }
);

