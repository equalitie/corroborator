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
    // ## create a combo view to handle the actions
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
    
    var ActionComboView = Combo.view.extend({
      eventIdentifier: 'action_combo',
      el: '.actions',
      initialize: function(options) {
        Combo.view.prototype.initialize.call(this, options);
        this.collection = options.collection;
        this.handleNavigation();
      },
      /**
       * register a handler for navigation events
       */
      handleNavigation: function() {
        Streams.navBus.toProperty()
            .onValue(this.updateCollection, this);
      },
      updateCollection: function(context, value) {
        console.log(context, value);
      }
    });

    // ## used to render an item from the collection passed in
    var HeaderView = Backbone.View.extend({
      el: '.search-header',
      events: {
        'click a': 'handleFilter'
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
