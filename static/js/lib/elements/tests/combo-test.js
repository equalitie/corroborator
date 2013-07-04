/**
 * Test suite for our combo view
 */
define(
  [
    'lib/elements/combo',
    'jquery',
    'lib/streams'
  ],
  function(Combo, $, Streams) {
    var assert = buster.assert;
    var bus = Streams.searchBus;
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
        //$(document.body).append('<div class=\'search-combo\'></div>');
        this.collection = new Combo.Collection(searches);
        this.view = new Combo.View({ 
          el: '.search-combo',
          collection: this.collection,
          eventIdentifier: 'combo-test',
          bus: bus,
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
        assert.equals(typeof(Combo.Collection), 'function');
        assert.equals(typeof(Combo.View), 'function');
      },
      'the view should accept a primary function for the combo box': function() {
        assert.equals($('.combo-main').text(), 'Search');
      },
      'the view should dispatch the search event when clicked': function(done) {
        bus.toEventStream().filter(function(value) {
          return value.type === 'combo-test';
        }).take(1).onValue(done(function(value) {
          assert.equals(value.content.get('name_en'), 'Search');
        }));
        $('.combo-main').click();
      },
      'the view should render a list of predefined searches': function() {
        var totalSearchItems = $('#predefined_options').children().length;
        assert.equals(totalSearchItems, 2);
      },
      'the view should attach arbitrary items': function() {
        var item = {
          name_en: 'Save current search...',
          search_request: 'save_search'
        };
        this.collection.add(item);
        this.view.render();
        var totalSearchItems = $('#predefined_options').children().length;
        assert.equals(totalSearchItems, 3);
      },
      'clicking on an item should dispatch a search event with the search params': function(done) {
        bus.toEventStream().take(1).onValue(done(function (value) {
          var searchModel  = value.content;
          assert.equals(searchModel.get('request'), 'request');
        }));
        $('#predefined_options').children('li:first').click();

      }
    });
    
  }
);

