/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a form to add events to the database and expose and input field
// with added events to be saved to the records it is related to
// Composed of three views EventContainerView holds EventFormView and 
// EventDisplayView
define (
  [
    'jquery', 'backbone', 'underscore',
    'lib/CRUD/views/form-mixins',   
    'lib/CRUD/data/EventCollection',
    'lib/elements/select-option',
    'lib/CRUD/templates/event-container.tpl',
    'lib/CRUD/templates/event-display.tpl',
    'lib/CRUD/templates/event-form.tpl'
  ],
  function ($, Backbone, _, Mixins, EventData, SelectOptionView,
    eventContainerTmp, eventDisplayTmp, eventFormTmp) {
    'use strict';

    var EventFormView,
        EventContainerView,
        EventsDisplayView,
        EventDisplayView,
        Formatter    = Mixins.Formatter,
        WidgetMixin  = Mixins.WidgetMixin;

    // ### EventContainerView
    // Hold the other two views
    EventContainerView = Backbone.View.extend({
      //store a reference to our child views so we can destroy them
      childViews: [],
      selectViews: [],

      template: eventContainerTmp,

      // constructor
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: entityType not set';
        }
        this.collection = new EventData.EventCollection();
        this.collection.on('sync', this.renderSelectOptions, this);
        this.entityType = options.entityType;
        this.render()
            .renderChildren();
      },

      //destroy the view and it's children
      destroy: function() {
        this.destroyChildViews();
        this.destroySelectViews();
        this.childViews = [];
        this.$el.remove();
        this.undelegateEvents();
      },
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
      },
      destroySelectViews: function() {
        _.invoke(this.selectViews, 'destroy');
      },

      // render all display elements
      renderChildren: function() {
        this.renderEventForm()
            .renderEventsDisplay()
            .renderSelectOptions();
      },

      // render the event form
      renderEventForm: function() {
        var eventFormView = new EventFormView({
          el: '.event-form',
          collection: this.collection
        });
        this.childViews.push(eventFormView);
        return this;
      },

      // render the existing events
      renderEventsDisplay: function() {
        var eventsDisplayView = new EventsDisplayView({
          el: this.$el.children('ul.events'),
          collection: this.collection
        });
        this.childViews.push(eventsDisplayView);
        return this;
      },

      // render the select options used by forms above this
      renderSelectOptions: function() {
        this.destroySelectViews();
        this.collection.each(this.addToSelectList, this);
        return this;
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

      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
        return this;
      }
    });
    
    // ### EventFormView
    // Display the event form
    EventFormView = Backbone.View.extend({
      formElClass: 'timeinfo-field',
      entityType: 'timeinfo',
      events: {
        'click .do-addEvent': 'addEventRequested'
      },
      childViews: [],
      selectViews: [],

      // specify slider fields
      sliderFields: [
        { // reliability score ( event )
          sliderDiv : '#bulletin-event-block .score-editor .slider',
          formField : 'confidence_score',
          startPoint: 0,
          endPoint  : 100,
          suffix    : '%',
          marks     : [0, 50, 100],
          snap      : false,
          value     : 50 // TODO enable for update
        }
      ],

      // specify a field to be built as a datetime range element
      dateTimeRangeFields: [
        {
          el: '.event-time-range',
          from: {
            name: 'time_from',
            value: '',
            classes: ''
          },
          to: {
            name: 'time_to',
            value: '',
            classes: ''
          }
        }
      ],

      template: eventFormTmp,
      // constructor - render the form and enable form widgets
      initialize: function() {
        this.render();
        this.enableWidgets();
        this.collection.on('edit', this.populateForm, this);
        this.collection.on('destroy', this.checkCurrentModelMatches, this);
      },
      
      // handle click on add event
      addEventRequested: function(evt) {
        evt.preventDefault();
        if (this.model === undefined) { // new comment
          var eventModel = new EventData.EventModel(this.formContent());
          eventModel.save();
          this.collection.add(eventModel);
        }
        else { // update existing comment
          this.model.set(this.formContent());
          this.model.save();
          this.model = undefined;
        }
        this.clearForm();
      },

      // populate the form with the model details if the user wants to
      // edit
      populateForm: function(model) {
        this.model = model;
        this.dateTimeRangeFields[0].from.value = model.get('time_from');
        this.dateTimeRangeFields[0].to.value = model.get('time_to');

        this.sliderFields[0].value = model.get('confidence_score');
        this.render();
        this.$el.children()
                .children('textarea[name=comments_en]')
                .val(model.get('comments_en'));
        this.$el.children()
                .children('textarea[name=comments_ar]')
                .val(model.get('comments_ar'));
        this.enableWidgets();
      },
      // check if we are editing the model that is being deleted  
      // empty the form if it is
      checkCurrentModelMatches: function(model) {
        if (_.isEqual(model, this.model)) {
          this.clearForm();
          this.model = undefined;
        }
      },

      clearForm: function() {
        this.render();
        this.sliderFields[0].value = 50;

        // TODO check for possible mem leak
        this.enableWidgets();
      },

      // remove dom elements and unsubscribe from events
      destroy: function() {
        this.collection.off('edit', this.populateForm, this);
        this.collection.off('destroy', this.checkCurrentModelMatches, this);
        this.$el.remove();
        this.undelegateEvents();
      },

      // render dom elements
      render: function() {
        var modelJSON = {};
        if (this.model !== undefined) {
          modelJSON = this.model.toJSON();
        }
        var html = this.template({
          entityType: this.entityType,
          model: modelJSON
        });
        this.$el.html(html);
      }
    });

    // extend the form view with our mixins
    _.extend(EventFormView.prototype, WidgetMixin);
    _.extend(EventFormView.prototype, Formatter);
    
    // ### EventsDisplayView
    // 
    EventsDisplayView = Backbone.View.extend({
      childViews: [],
      initialize: function() {
        this.collection.on('add remove change', this.render, this);
        this.render();
      },
      destroy: function() {
        this.destroyChildren();
        this.collection.off('add remove change', this.render, this);
        this.$el.remove();
        this.undelegateEvents();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
      },
      render: function() {
        console.log('render events');
        console.log(this.collection);
        this.destroyChildren();
        this.collection.each(function(model) {
          var commentView = new EventDisplayView({
            model: model,
            collection: this.collection
          });
          this.$el.prepend(commentView.$el);
          this.childViews.push(commentView);
        }, this);
      }
    });

    // ### EventDisplayView
    // display a single comment, handle edit/remove events
    EventDisplayView = Backbone.View.extend({
      // define a template
      template: eventDisplayTmp,
      tagName: 'li',
      className: 'comment',
      // define event handlers
      events: {
        'click .do-edit': 'editEvent',
        'click .do-remove': 'removeEvent',
      },
      // constructor - render the view
      initialize: function() {
        this.render();
      },
      // edit comment clicked - trigger an edit event on the model
      // and send the model with it
      editEvent: function(evt) {
        evt.preventDefault();
        this.collection.trigger('edit', this.model);
      },
      // remove comment clicked, delete the model and destroy 
      // this view
      removeEvent: function(evt) {
        evt.preventDefault();
        this.model.destroy();
        this.destroy();
      },

      // remove the dom elements and unsubscribe to events
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },

      // render the comment
      render: function(evt) {
        console.log(evt, this.model);
        var html = this.template({model: this.model.toJSON()});
        this.$el.empty().append(html);
      }
    });

    return {
      EventContainerView: EventContainerView,
      EventFormView: EventFormView,
      EventsDisplayView: EventsDisplayView,
      EventDisplayView: EventDisplayView
    };
});
