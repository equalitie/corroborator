/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a form to add events to the database and expose and input field
// with added events to be saved to the records it is related to
// Composed of three views EventContainerView holds EventFormView and 
// EventDisplayView
define (
  [
    'backbone', 'underscore',
    'lib/CRUD/views/form-mixins',   
    'lib/CRUD/templates/event-container.tpl',
    'lib/CRUD/templates/event-display.tpl',
    'lib/CRUD/templates/event-form.tpl'
  ],
  function (Backbone, _, Mixins,
    eventContainerTmp, eventDisplayTmp, eventFormTmp) {
    'use strict';

    var EventFormView,
        EventContainerView,
        EventDisplayView,
        Formatter    = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin,
        WidgetMixin  = Mixins.WidgetMixin;

    // ### EventContainerView
    // Hold the other two views
    EventContainerView = Backbone.View.extend({
      //store a reference to our child views so we can destroy them
      childViews: [],

      template: eventContainerTmp,

      // constructor
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: entityType not set';
        }
        this.entityType = options.entityType;
        this.render()
            .renderChildren();
      },

      //destroy the view and it's children
      destroy: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
        this.$el.remove();
        this.undelegateEvents();
      },

      renderChildren: function() {
        var eventFormView = new EventFormView({
          el: '.event-form'
        });
        return this;
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
      childViews: [],
      entityType: 'timeinfo',
      sliderFields: [
        { // reliability score ( event )
          sliderDiv : '#bulletin-event-block .score-editor .slider',
          startPoint: 0,
          endPoint  : 100,
          suffix    : '%',
          marks     : [0, 50, 100],
          snap      : false,
          value     : 50 // TODO enable for update
        }
      ],
      dateTimeRangeFields: [
        {
          el: '.event-time-range',
          from: {
            name: 'time_from',
            classes: ''
          },
          to: {
            name: 'time_to',
            classes: ''
          }
        }

      ],

      template: eventFormTmp,
      initialize: function() {
        this.render();
        this.enableWidgets();
      },

      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },

      render: function() {
        var html = this.template({
          entityType: this.entityType
        });

        this.$el.html(html);
      }
    });
    // extend the form view with our mixins
    _.extend(EventFormView.prototype, WidgetMixin);
    _.extend(EventFormView.prototype, Formatter);
    
    return {
      EventContainerView: EventContainerView,
      EventFormView: EventFormView,
      EventDisplayView: EventDisplayView
    };
});

