// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/views/search-views/media/media-search-field',
    'lib/CRUD/data/LocationCollection',
    // templates
    'lib/CRUD/templates/search-templates/actor.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins, ActorSearchView, MediaSearchView,
    Location, actorFormTmp) {

    var ActorFormView,
        crudBus            = Streams.crudBus,
        Formatter          = Mixins.Formatter,
        WidgetMixin        = Mixins.WidgetMixin,
        LocationCollection = Location.LocationCollection,
        ConfirmMixin       = Mixins.ConfirmMixin;

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      childViews: [],
      subscribers: [],
      entityType: 'actor',
      events: {
        'click button#actor-action_save': 'saveRequested',
        'click button.do-hide': 'requestCloseForm'
      },

      // keys for date fields, these need to be validated and removed
      // from the model object if invalid
      dateFields: ['DOB', 'POB'], 

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
          display: {
            field_name : 'POB',
            field_label: 'Place Of Birth'
          },
          content: {
            values: 'POB',
          }
        },
        current_location: {
          containerid: '#actor-current-location-block',
          collection : LocationCollection,
          multiple: false,
          display: {
            field_name : 'current_location',
            field_label: 'Current Location'
          },
          content: {
            values: 'current_location',
          }
        }

      },
      // constructor
      initialize: function() {
        this.render();
      },

      // remove the dom elements and all associated events
      onDestroy: function() {
        this.destroyChildViews();
      },
      
      // destroy the sub views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // render the form
      render: function() {
        var html = this.model !== undefined ? 
          actorFormTmp({model: this.model.toJSON()}) : actorFormTmp({ model: {} });
        this.$el = $(html);
      },


      // pull the data from the form
      formContent: function() {
        var formArray = $('#actor_form').serializeArray();
        return this.formArrayToData(formArray);
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

      // send the form data on the crudBus, it will be picked up in data and 
      // persisted
      saveRequested: function() {
        var formContent = this.formContent();
        formContent = this.validateDateFields(formContent);
        this.model.set(formContent);
        if (this.model.isNew() === true) {
          crudBus.push({
            type: 'create_new_actor',
            content: this.model
          });
        }
        this.model.save();
      },

      // render the sub views
      renderChildren: function() {
        var mediaSearchView = new MediaSearchView({
          el: '#actor-media-block',
          content: this.model.get('media'),
          entitytype: 'actor',
          multiple: false,
          label: 'Actor Image',
          name: 'media'
        });
        this.childViews.push(mediaSearchView);
      }

    });
    _.extend(ActorFormView.prototype, ConfirmMixin);
    _.extend(ActorFormView.prototype, WidgetMixin);
    _.extend(ActorFormView.prototype, Formatter);
    
    return {
      ActorFormView: ActorFormView
    };

});
