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
        this.listenTo(this.model, 'remove_selected', this.destroy.bind(this));
      },

      removeFilter: function() {
        this.collection.remove(this.model);
      },

      // destroy the view
      onDestroy: function() {
        this.stopListening();
      },

      // render a single filter
      render: function() {
        var html = labelTmp({
          model: this.model.toJSON(),
          content: this.content
        });
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
        this.multiple = options.multiple;

        // TODO reset these with existing values
        this.selectCollection = new Backbone.Collection();


        // listend for add and remove events
        this.listenTo(this.selectCollection, 'add remove',
          this.renderSelected.bind(this));
        
        this.listenTo(this.collection, 'add remove',
          this.initAutocomplete.bind(this));
        
        this.listenTo(this.selectCollection, 'add remove',
          this.reinsertModel.bind(this));

        // populate existing content
        if (this.options.content !== undefined) {
          this.content = this.options.content;
          this.selectModelsFromResourceUri(this.content.values);
        }

        this.templateVars = {
          display: options.display,
          entityType: this.entityType,
          multiple: this.multiple
        };
        this.render()
            .renderSelected();
        this.initAutocomplete();
      },

      // enable the autocomplete functionality
      initAutocomplete: function() {
        var autocompleteSrc = this.collection.autoCompleteFormat(),
            inputEl = this.$el.children('ul')
                              .children('li')
                              .children('input');
          inputEl.autocomplete({
          minLength: 0,
          source: autocompleteSrc,
          select: this.addToSelectedList.bind(this, inputEl)
        });
      },
      addToSelectedList: function(inputEl, evt, ui) {
        this.selectModelFromResourceUri(ui.item.id);
        $(inputEl).val('');
        return false;
      },

      selectModelsFromResourceUri: function(resourceUriList) {
        _.each(resourceUriList, this.selectModelFromResourceUri, this);
      },

      selectModelFromResourceUri: function(resourceUri) {
        var filterItemById = function(model) {
          return model.get('resource_uri') === resourceUri;
        };
        var selectedModel = this.collection.chain()
                                .filter(filterItemById)
                                .last()
                                .value();
        // remove the models form the select collection if this is a single
        // value field
        if (this.multiple === false) {
          this.selectCollection.each(function(model) {
            this.selectCollection.remove(model);
          }, this);
        }
        this.selectCollection.add(selectedModel);
        this.collection.remove(selectedModel);
      },


      reinsertModel: function(model) {
        this.collection.add(model);
      },

      
      onDestroy: function() {
        this.destroyChildViews();
        this.stopListening();
      },

      destroyChildViews: function() {
        _.invoke(this.displayViews, 'destroy');
        _.invoke(this.selectViews, 'destroy');
        this.displayViews = [];
        this.selectViews  = [];
      },

      // render the 
      renderSelected: function() {
        this.destroyChildViews();
        this.selectCollection.each(this.addToDisplayList, this);
        this.selectCollection.each(this.addToSelectList, this);
        return this;
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
        return this;

      }
    });

    return LabelWidgetView;
});


