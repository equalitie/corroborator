/*global define, Bacon */
/**
### header.js

This displays the header view
it provides:
- feedback on the number of actors selected
- filtering for the search results
- a menu to select/unselect all, create new, or update

*/
define(
  [
    // vendor
    'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    // elements
    'lib/elements/combo',
    // templates
    'lib/SolrSearch/templates/header.tpl'
  ],
  function ($, Backbone, Handlebars, Streams, Combo) {
    'use strict';
    // collection of menu items
    var menuItems = new Backbone.Collection([
      {
        name_en: 'Delete Selected',
      },
      {
        name_en: 'Update Selected',
      },
      {
        name_en: 'Select All',
      },
      {
        name_en: 'Clear Selected',
      },
    ]);

    // Stream processing functions
    var filterActions = function(value) {
      return value.type === 'action_combo';
    };
    // event stream processing helpers
    var extractResults = function(value) {
      return value.content;
    };
    var getActionType = function(model) {
     return {
       option: model.get('name_en')
     };
    };
    // used to combine nav and action combo events
    var combineBoth = function(previous, newValue) {
      if (newValue.hasOwnProperty('navValue')) {
        previous.navValue = newValue.navValue;
        previous.action = false;
      }
      if (newValue.hasOwnProperty('option')) {
        previous.option = newValue.option;
        previous.action = true;
      }
      return previous;
    };
    var filterExecuteAction = function(value) {
      return value.action === true;
    };

    // map navigation event into a wrapped one
    var createNavProperty = function() {
      var mapNav = function(value) {
        return { navValue: value };
      };
      return Streams.navBus
                    .toEventStream()
                    .map(mapNav);
    };
    // distinguish between new nav and action events
    var identifyNewAction = function(previous, newValue) {
      console.log(previous.option, newValue.option);
      console.log('identifyNewAction');
      return previous.option === newValue.option;
    };
    
    // ## create a combo view to handle the actions
    var ActionComboView = Combo.view.extend({
      eventIdentifier: 'action_combo',
      el: '.actions',
      initialize: function(options) {
        Combo.view.prototype.initialize.call(this, options);
        this.collection = options.collection;
        this.propogateEvents();
      },

      /**
       * register a handler for navigation events
       */
      propogateEvents: function() {
        var self = this;

        var selectStream = Streams.searchBus.toEventStream()
                           .filter(filterActions)
                           .map(extractResults)
                           .map(getActionType);

        var both = selectStream.merge(createNavProperty());
        var watcher = both.scan({
                            type: self.eventIdentifier + '_combined'
                          }, combineBoth);
        watcher.filter(filterExecuteAction)
               .onValue(function(value) {
                  Streams.searchBus.push(value);
                });

      }
    });

    // ## used to render an item from the collection passed in
    var HeaderView = Backbone.View.extend({
      el: '.search-header',
      events: {
        'click a': 'handleFilter',
        'click .date': 'sortDate',
        'click .location': 'sortLocation',
        'click .title': 'sortTitle',
        'click .status': 'sortStatus',
        'click .score': 'sortScore'
      },
      initialize: function(options) {
        this.template = Handlebars.templates['header.tpl'];
        this.comboView = new ActionComboView({
          collection: menuItems,
          bus: Streams.searchBus,
          primary: {
            name_en: 'Actions',
            search_request: 'none'
          }
        });
        this.render();
      },
      handleFilter: function(e) {
        e.preventDefault();
        $(e.currentTarget).parent()
                          .siblings()
                          .children()
                          .removeClass('current')
                          .removeClass('is-descending');

        $(e.currentTarget).parent()
                          .children()
                          .removeClass('current')
                          .removeClass('is-descending');

        $(e.currentTarget).addClass('current').addClass('is-descending');
      },

      render: function() {
        var header = this.template({domain: 'incidents'});
        this.$el.append(header);
        this.renderComboBox();
      },
      // render the actions
      renderComboBox: function() {
        // needed because actions div has just been rendered
        this.comboView.setElement('.actions');
        this.comboView.render();
      }
    });

    // expose our view as a module export
    return {
      HeaderView: HeaderView
    };
});
