/*global define, Bootstrap */
// Author: Cormac McGuire

// ### Description
// Handle create update of actor(s)
//
define (
  [
    'jquery', 'underscore', 'backbone',
    'lib/data-entry/streams',
    'lib/CRUD/views/form-mixins',
    'lib/Data/LocationCollection',
    'lib/Data/actor',
    // templates
    'lib/CRUD/templates/display-templates/actor-display.tpl',
    'lib/data-entry/templates/actor-form.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function ($, _, Backbone,
    Streams, Mixins, Location, Actor,
    actorDisplayTmp, actorFormTmp, i18n) {
    'use strict';

    var ActorFormView,
        ActorPreviewView,
        ActorModel         = Actor.ActorModel,
        dataEntryBus       = Streams.dataEntryBus,
        Formatter          = Mixins.Formatter,
        WidgetMixin        = Mixins.WidgetMixin,
        LocationCollection = Location.LocationCollection;

    // ###ActorPreviewView
    // show a dialog with a preview of the actor
    // 
    ActorPreviewView = Backbone.View.extend({
      template: function() {
        return actorDisplayTmp.apply(this, arguments);
      },
      initialize: function (options) {
        this.render();
      },
      render: function() {
        this.$el.html(this.template({
          model: this.model.toJSON(),
          i18n: i18n
        }));
        this.$el.attr('title', i18n.dialog.Preview_add_actor);
      }
    });

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      template: actorFormTmp,
      className: 'actor-overlay overlay WIREFRAME',
      childViews: [],
      subscribers: [],
      entityType: 'actor',
      expanded: true,
      events: {
        'click input.save-data-entry'  : 'saveRequested',
      },

      // keys for date fields, these need to be validated and removed
      // from the model object if invalid
      dateFields: ['DOB'], 

      // ids of combo boxes
      comboIds: ['#sex_en', '#age_en', '#civilian_en'],

      // represent free text input fields that will autocomplete
      // based on the content of the collection, these labels will
      // persist based on the model type in the collecion
      labelFields: {
        POB: {
          containerid: '#actor-pob-block',
          collection : LocationCollection,
          multiple: false,
          bus: dataEntryBus,
          eventIdentifier: 'actor_pob',
          display: {
            field_name : 'POB',
            field_label: 'Place Of Birth'
          },
          content: {
            values: 'POB'
          }
        },
        current_location: {
          containerid: '#actor-current-location-block',
          collection : LocationCollection,
          multiple: false,
          bus: dataEntryBus,
          eventIdentifier: 'actor_current',
          display: {
            field_name : 'current_location',
            field_label: 'Current Location'
          },
          content: {
            values: 'current_location'
          }
        }

      },
      mapFields: [
        {
          containerid: '#actor-current-map-block',
          locationSource: 'actor_current_label',
          bus: dataEntryBus
        },
        {
          containerid: '#actor-pob-map-block',
          locationSource: 'actor_pob_label',
          bus: dataEntryBus
        }
      ],
      // constructor
      initialize: function(options) {
        this.addi18n();
        this.displayNewModel();
      },

      // create and display a blank model to be added to
      displayNewModel: function() {
        this.removeOldModelListeners();
        this.model = this.createModel();
        this.listenTo(this.model, 'sync', this.modelSaved.bind(this));
        this.populateWidgets();
        this.displayForm();
      },

      modelSaved: function() {
        console.log('created');
        this.displayNewModel();
      },
      
      createModel: function() {
        return new ActorModel({
          comment: 'Human Created',
          status: 'Human Created',
          status_uri: '/api/v1/statusUpdate/2/'
        });
      },

      removeOldModelListeners: function() {
        this.stopListening(this.model);
      },


      show: function() {
        this.$el.removeClass('hidden');
      },
      hide: function() {
        this.$el.addClass('hidden');
      },

      // return a function that creates the form only once
      displayForm: function() {
        this.render()
            .renderChildren()
            .enableWidgets()
            .setUpScrollToPositions();
      },

      // remove the dom elements and all associated events
      onDestroy: function() {
        this.disableWidgets();
        this.stopListening();
      },

      // destroy the sub views
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // we need to remove DOB from the object if they do not have
      // valid dates - test it baby
      validateDateFields: function(formContent) {
        var invalidKeys = [];
        _.each(formContent, function(value, key) {
          if (_.indexOf(this.dateFields, key) !== -1 && this.validateDate(value)=== null) {
            invalidKeys.push(key);
          }
        }, this);
        return _.omit(formContent, invalidKeys);

      },
      validateDate: function(dateString) {
        return dateString.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/);
      },

      // render the form
      render: function() {
        console.log(this.model.toJSON());
        var html = this.template({
          model: this.model.toJSON(),
          statuses: Bootstrap.comment_statuses,
          i18n: i18n
          });
        this.$el.html(html);
        return this;
      },
      delegateSave: function() {
        this.displayPreview();
      },

      displayPreview: function() {
        var model = this.model,
            previewView = new ActorPreviewView({
              model: this.model
            }),
            buttons = {};

        buttons[i18n.dialog.Confirm] = function() {
          $(this).dialog('close');
          model.save();
          previewView.destroy();
        };
        buttons[i18n.dialog.Cancel] = function() {
          $(this).dialog('close');
          previewView.destroy();
        };

        previewView.$el.dialog({
          buttons: buttons,
          modal: true,
          width: 700
        });

      },

      // render the sub views
      renderChildren: function() {
        this.destroyChildren();
        // show the media search view
        this.childViews.push();
        return this;
      }

    });
    _.extend(ActorFormView.prototype, WidgetMixin);
    _.extend(ActorFormView.prototype, Formatter);

    return ActorFormView;

});
