/*global define */
/**
### combo
represent a combo box 
reacts to the being pressed - sends the model that has been pressed in the event

collection contains the elements to be displayed

When creating an instance of the view, you can either pass in the element to watch
or have one rendered.



you may also pass a custom event dispatcher which will be used instead of the 
global dispatcher for sending events

TODO: define template for the view
*/
define(
  [
    // vendor
    'jquery', 'underscore', 'backbone', 'handlebars',
    // local libs
    'lib/dispatcher',
    // templates
    'lib/elements/templates/combo-outer.tpl',
    'lib/elements/templates/combo-inner.tpl'
  ],
  function ($, _, Backbone, Handlebars, dispatcher, co, ci) {
    'use strict';
    // ##
    var collection = Backbone.Collection.extend();

    // ## used to render an item from the collection passed in
    var ItemView = Backbone.View.extend({
      events: {
        'click': 'itemClicked'
      },
      initialize: function() {
        this.template = Handlebars.templates['combo-inner.tpl'];
        this.render();
      },
      itemClicked: function() {
        dispatcher.trigger('item_clicked', this.model);
      },
      render: function() {
        var html = this.template(this.model.toJSON());
        this.$el = $(html);
        this.setElement(this.$el);
      }
    });

    // ### Combo view
    var ComboView = Backbone.View.extend({
      events: {
        'click .combo-main': 'mainSearch',
      },

      // init the view setting the default item if provided
      initialize: function(options) {
        if (options.element) {
          this.setElement(options.element);
        }
        if (options.primary) {
          this.setPrimary(options.primary);
        }
        this.template = Handlebars.templates['combo-outer.tpl'];
        // re-render the combo box if the collection changes
        this.collection.on('add remove reset', this.render, this);
      },

      setPrimary: function(primary) {
        this.primary = {
          name_en: primary.name_en,
          search_request: primary.search_request
        };
      },

      // dispatch the event associated with the default element
      mainSearch: function() {
        dispatcher.trigger(this.primary.search_request);
      },

      // render the list contents
      render: function() {
        var html = this.template(this.primary);
        this.$el.children().remove();
        this.$el.append(html);
        this.renderList();
      },

      // iterate over our collection
      renderList: function() {
        this.collection.each(this.renderListItem, this);
      },

      // render each item in the list 
      renderListItem: function(model, index, list) {
        var itemView = new ItemView({ model: model });
        this.$el.children().children('ul').append(itemView.$el);
      }
    });


    // expose our view as a module export
    return {
      view: ComboView,
      collection: collection
    };
});

