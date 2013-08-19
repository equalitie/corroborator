/*global define, Bacon */
// Author: Cormac McGuire  
// ### combo.js
// represent a combo box   
// reacts to the being pressed - sends the model that has been pressed in the event
// collection contains the elements to be displayed  
// When creating an instance of the view, you can either pass in the element to watch
// or have one rendered.  
// you may also pass a custom event dispatcher which will be used instead of the 
// global dispatcher for sending events
// 
define(
  [
    // vendor
    'jquery', 'backbone', 'handlebars',
    // templates
    'lib/elements/templates/combo-outer.tpl',
    'lib/elements/templates/combo-inner.tpl'
  ],
  function ($, Backbone, Handlebars, comboOuterTmp, comboInnerTmp) {
    'use strict';
    // Drop down item collection
    var Collection = Backbone.Collection.extend(),
        ItemView,
        ComboView,
        ComboWidget;

    // ## ItemView
    // used to render an item from the collection passed in
    ItemView = Backbone.View.extend({
      events: {
        'click': 'itemClicked'
      },
      tagName: 'li',
      initialize: function(options) {
        this.eventIdentifier = options.eventIdentifier;
        this.bus = options.bus;
        this.render();
      },
      // handle a click on one of the list items  
      // push an item onto the bus when received
      itemClicked: function() {
        if (this.bus) {
          this.bus.push({
            type: this.eventIdentifier,
            content: this.model
          });
        }
      },

      // render the list items
      render: function() {
        var html = comboInnerTmp(this.model.toJSON());
        this.$el.append(html);
        this.$el.addClass('option selected');
        this.setElement(this.$el);
      }
    });

    // ### Combo view
    // Container view for the combo box - uses ItemView to render the 
    // individual items
    ComboView = Backbone.View.extend({
      eventIdentifier: 'combo',
      events: {
        'click .combo-main': 'mainElementClicked'
      },

      // init the view setting the default item if provided
      initialize: function(options) {
        if (options.primary) {
          this.setPrimary(options.primary);
        }
        if (options.eventIdentifier) {
          this.eventIdentifier = options.eventIdentifier;
        }
        this.bus = options.bus;
        // re-render the combo box if the collection changes
        this.listenTo(this.collection, 'add remove reset', this.render.bind(this));
      },

      // push an event onto the bus 
      mainElementClicked: function() {
        this.bus.push({
          type: this.eventIdentifier,
          content: this.primary
        });
      },
      onDestroy: function() {
        this.stopListening();
      },


      // set the primary (header element for the combo box)  
      // TODO: change type
      setPrimary: function(primary) {
        this.primary = new Backbone.Model({
          name_en: primary.name_en,
          search_request: primary.search_request,
          type: 'search'
        });
      },

      // render the list contents
      render: function() {
        var html = comboOuterTmp(this.primary.toJSON());
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
        var options = {
          model: model,
          eventIdentifier: this.eventIdentifier
        };
        if (this.bus) {
          options.bus = this.bus;
        }
        var itemView = new ItemView(options);
        this.$el.children().children('ul').append(itemView.$el);
      }
    });

    // ### ComboWidget
    // input form combo dropdown, this accepts the container element, when a 
    // user selects an option it updates the displayed option and the hidden
    // field used to store the choice
    ComboWidget = function(el){
      this.setElement(el);
      this.setInput();
      this.createClickHandler();
    };
    ComboWidget.prototype = {
      setElement: function(el) {
        this.$el = $(el);
      },
      trigger: function() {},
      setInput: function() {
        this.input = $('input[name='+ this.$el.attr('id') + ']'); 
      },
      destroy: function() {
        this.$el.off('click');
        this.$el.removeData().unbind();
        this.$el.remove();
      },
      createClickHandler: function() {
        var self = this;
        this.$el.children()
                .children('li')
                .click(function() {
                  var selectedText = $(this).children('span').text();
                  self.setSelectedText(selectedText);
                });
      },
      setSelectedText: function(selectedText) {
        this.$el.children('span.selected-option').text(selectedText);
        this.input.val(selectedText);
      }


    };


    // expose the collection and container view as a module export
    return {
      View: ComboView,
      Collection: Collection,
      ComboWidget: ComboWidget
    };
});

