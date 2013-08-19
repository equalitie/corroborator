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
    'lib/CRUD/templates/search-templates/actor/actor.tpl'
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
      template: actorFormTmp,
      className: 'actor-overlay overlay WIREFRAME',
      childViews: [],
      subscribers: [],
      entityType: 'actor',
      expanded: false,
      events: {
        'click button#actor-action_save'  : 'saveRequested',
        'click button#expanded-actor-save': 'saveRequested',
        'click button.do-hide'            : 'requestCloseForm'
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
          bus: crudBus,
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
          bus: crudBus,
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
          bus: crudBus
        },
        {
          containerid: '#actor-pob-map-block',
          locationSource: 'actor_pob_label',
          bus: crudBus
        }
      ],
      // constructor
      initialize: function(options) {
        this.addi18n();
        this.populateWidgets();
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        // a little trickery here - cos we use toggleExpanded to render the view
        this.expanded = ! options.expanded;
        this.displayForm  = this.displayFormFunction();
      },

      // toggle the expanded switch and render the form
      toggleExpanded: function() {
        this.displayForm();
        if (this.expanded === true) {
          this.expanded = false;
          this.$el.removeClass('is-expanded');
          this.$el.addClass('is-preview');
          this.$el.children('.body')
                  .children('.first')
                  .children('.Actor')
                  .removeClass('is-expanded')
                  .addClass('in-preview');

          this.$el.children('.body')
                  .children('.first')
                  .removeClass('span-66p');
        }
        else {
          this.expanded = true;
          this.$el.addClass('is-expanded');
          this.$el.removeClass('is-preview');
          this.$el.children('.body')
                  .children('.first')
                  .children('.Actor')
                  .addClass('is-expanded')
                  .removeClass('in-preview');
          this.$el.children('.body')
                  .children('.first')
                  .addClass('span-66p');
        }
      },

      // return a function that creates the form only once
      displayFormFunction: function() {
        return _.once(function() {
          this.render()
              .renderChildren()
              .enableWidgets();
        });
      },

      

      // remove the dom elements and all associated events
      onDestroy: function() {
        this.disableWidgets();
        this.destroyChildren();
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

      // render the form
      render: function() {
        var html = this.template({model: this.model.toJSON()});
        this.$el.html(html);
        return this;
      },

      // render the sub views
      renderChildren: function() {
        this.destroyChildren();
        // show the media search view
        var mediaSearchView = new MediaSearchView({
          el: '#actor-media-block',
          content: this.model.get('media'),
          entitytype: 'actor',
          multiple: false,
          label: 'Actor Image',
          name: 'media'
        });

        var actorSearchView = new ActorSearchView({
          el: '#actor-actor-list-block',
          content: this.model.get('actors_role'),
          entityType: 'actor',
          relationshipType: 'relation'
        });

        this.childViews.push(mediaSearchView, actorSearchView);
        return this;
      }

    });
    _.extend(ActorFormView.prototype, ConfirmMixin);
    _.extend(ActorFormView.prototype, WidgetMixin);
    _.extend(ActorFormView.prototype, Formatter);
    
    return {
      ActorFormView: ActorFormView
    };

});
