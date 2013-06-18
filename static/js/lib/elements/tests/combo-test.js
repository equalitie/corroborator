/**
 * Test suite for our combo view
 */
define(
  ['lib/elements/combo', 'jquery', 'lib/dispatcher'],
  function(Combo, $, dispatcher) {
    var assert = buster.assert;
    buster.testCase('Combo box tests', {
      setUp: function() {
        var searches = [
          {
            "id":2,
            "request":"request",
            "name_en":"stuff",
            "name_ar":"stuff",
            "type":"actor"
          },
          {
            "id":1,
            "request":"request",
            "name_en":"test",
            "name_ar":"test",
            "type":"incident"
          }
        ];
        $(document.body).append('<div class=\'search-combo\'></div>');
        this.collection = new Combo.collection(searches);
        this.view = new Combo.view({ 
          element: '.search-combo',
          collection: this.collection,
          primary: {
            name_en: 'Search',
            search_request: 'search_requested'
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
        var totalSearchItems = $('ul').children().length;
        assert.equals(totalSearchItems, 2);
      },
      'the view should attach arbitrary items': function() {
        var item = {
          name_en: 'Save current search...',
          search_request: 'save_search'
        };
        this.collection.add(item);
        this.view.render();
        var totalSearchItems = $('ul').children().length;
        assert.equals(totalSearchItems, 3);
      },
      'clicking on an item should dispatch a search event with the search params': function(done) {
        var li = $('ul').children('li:first')[0];
        dispatcher.on('item_clicked', done(function (searchModel) {
          assert(searchModel.get('request'), 'request');
        }));
        li.click();
      }
    });
    
  }
);

