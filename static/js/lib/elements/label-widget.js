/*global define*/
// Author: Cormac McGuire
// ### Description
// create a label widget that provides a free text input that can persist
// text entered to a specified collection and auto completes with existiong
// content

define (
  [
    'jquery', 'backbone', 'underscore',
    'lib/elements/select-option',
    'lib/elements/templates/label-widget.tpl',
    'lib/elements/templates/label.tpl'
  ],
  function ($, Backbone, _, SelectOptionView, labelWidgetTmp, labelTmp) {
    'use strict';

    var LabelWidgetView;

    // ### LabelView
    // display a single label
    var LabelView = Backbone.View.extend({
      tagName: 'li',
      className: 'tag',
      events: {
        'click .do-clear': 'removeFilter'
      },
      // constructor
      initialize: function(options) {
        this.render();
        this.model.on('remove_selected', this.destroy, this);
      },

      removeFilter: function() {
        this.collection.remove(this.model);
      },

      // destroy the view
      destroy: function() {
        this.model.off('remove_selected');
        this.$el.remove();
        this.undelegateEvents();
      },

      // render a single filter
      render: function() {
        var html = labelTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      }
    });

    LabelWidgetView = Backbone.View.extend({
      events: {
      },
      selectCollection: undefined,
      displayCollection: undefined,
      selectViews: [],
      displayViews: [],
      // constructor 
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: entityType undefined';
        }
        this.entityType = options.entityType;
        if (this.collection === undefined) {
          throw 'Widget view requires collection';
        }
        // TODO reset these with existing values
        this.selectCollection = new Backbone.Collection();
        this.selectCollection.on('add remove', this.renderSelected, this);
        this.collection.on('add remove', this.initAutocomplete, this);
        this.selectCollection.on('remove', this.reinsertModel, this);
        this.templateVars = {
          display: options.display,
          entityType: this.entityType
        };
        this.render();
        this.initAutocomplete();
      },

      // enable the autocomplete functionality
      initAutocomplete: function() {
        var autocompleteSrc = this.collection.autoCompleteFormat(),
            self = this,
            inputEl = this.$el.children('ul')
                              .children('li')
                              .children('input');
          inputEl.autocomplete({
          minLength: 0,
          source: autocompleteSrc,
          select: function(event, ui) {
            var selectedModel =
              self.collection.chain()
                  .filter(function(model) {
                    return model.get('id') === ui.item.id;
                  })
                  .last()
                  .value();
              self.selectCollection.add(selectedModel);
              self.collection.remove(selectedModel);
              $(this).val('');
              return false;
          }
        });
      },
      reinsertModel: function(model) {
        this.collection.add(model);
      },

      
      destroy: function() {
        this.deleteChildViews();
        this.selectCollection.off('add remove', this.renderSelected, this);
        this.selectCollection.off('remove', this.reinsertModel, this);
        this.collection.off('add remove', this.initAutocomplete, this);
        this.$el.remove();
        this.undelegateEvents();
      },

      deleteChildViews: function() {
        _.invoke(this.displayViews, 'destroy');
        _.invoke(this.selectViews, 'destroy');
        this.displayViews = [];
        this.selectViews  = [];
      },

      // render the 
      renderSelected: function() {
        this.deleteChildViews();
        this.selectCollection.each(this.addToDisplayList, this);
        this.selectCollection.each(this.addToSelectList, this);
      },

      // add label view li to the ul in the view
      addToDisplayList: function(model) {
        var displayView = new LabelView({
          collection: this.selectCollection,
          model: model
        });
        this.$el.children('ul')
                .append(displayView.$el);
        this.displayViews.push(displayView);
      },

      // add a selected option to the hidden select element
      addToSelectList: function(model) {
        var selectOptionView = new SelectOptionView({
          model: model
        });
        this.$el.children('select')
                .append(selectOptionView.$el);
        this.selectViews.push(selectOptionView);

      },

      // render the container view
      render: function() {
        var html = labelWidgetTmp(this.templateVars);
        this.$el.empty()
                .append(html);

      }
    });

    

    return LabelWidgetView;
});


