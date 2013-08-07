// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    'lib/CRUD/views/form-mixins',

    'lib/CRUD/data/LabelCollection',
    'lib/CRUD/data/CrimeCollection',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/views/search-views/bulletin/bulletin-search-field',
    'lib/CRUD/views/search-views/incident/incident-search-field',

    // child views
    'lib/CRUD/views/comment-form',
    'lib/CRUD/views/event-form',

    // templates/search-templates
    'lib/CRUD/templates/search-templates/incident.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins,  Label, Crime,
    ActorSearchView, BulletinSearchView, IncidentSearchView, CommentForm,
    EventForm, incidentFormTmp) {

    var IncidentFormView,
        Formatter    = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin,
        WidgetMixin  = Mixins.WidgetMixin,
        CommentContainerView = CommentForm.CommentContainerView,
        EventContainerView   = EventForm.EventContainerView,
        CrimeCollection      = Crime.CrimeCollection,
        LabelCollection      = Label.LabelCollection,
        crudBus              = Streams.crudBus,
        userList     = function() {
          return Bootstrap.gl_ac_users_list;
        };

    // ### IncidentFormView
    // display create/update form for incidents
    IncidentFormView = Backbone.View.extend({
      entityType: 'incident',
      formElClass: 'incident_form',
      childViews: [],
      events: {
        'click button#incident-action_save': 'saveRequested',
        'click button#clear-user'          : 'clearUser',
        'click button.do-hide'             : 'requestCloseForm'
      },

      // define the fields that will have autocomplete enabled  
      // className refers to the input field which will have the autocomplete
      // result, content is an array of usernames and ids. name is the name of
      // the hidden field that stores the userid
      autoCompleteFields: [
        {
          className: '.is-assigned-to',
          content  : userList(),
          name     : 'assigned_user'
        }
      ],

      // represent free text input fields that will autocomplete
      // based on the content of the collection, these labels will
      // persist based on the model type in the collecion
      labelFields: {
        crimes: {
          containerid: '#incident-crime-block',
          collection : CrimeCollection,
          multiple: true,
          display: {
            field_name : 'crimes',
            field_label: 'Crimes'
          },
          content: {
            values: 'crimes'
          }
        },
        labels: {
          containerid: '#incident-label-block',
          collection : LabelCollection,
          multiple: true,
          display: {
            field_name : 'labels',
            field_label: 'Labels'
          },
          content: {
            values: 'labels'
          }
        }
      },
      sliderFields: {
        confidence_score: { // confidence_score
          sliderDiv : '#incident-score-block .score-editor .slider',
          display   : '#incident_confidence_score',
          formField : 'confidence_score',
          startPoint: 0,
          endPoint  : 100,
          suffix    : '%',
          marks     : [0, 50, 100],
          snap      : false,
          value     : 50 // TODO enable for update
        },
      },

      initialize: function() {
        this.populateWidgets();
        this.render();
      },

      // handle clear user click
      clearUser: function(e) {
        e.preventDefault();
        $(e.currentTarget).siblings('input').val('');
      },

      enableWidgets: function() {
        this.enableAutoCompleteFields();
        this.enableSliderFields();
        this.enableLabelFields();
      },
      onDestroy: function() {
        this.destroyChildViews();
      },

      // destroy the sub views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      render: function() {
        var html = incidentFormTmp({model: this.model.toJSON()});
        this.$el = $(html);
      },
      // pull the data from the form
      formContent: function() {
        var formArray = $('#incident_form').serializeArray();
        return this.formArrayToData(formArray);
      },
      saveRequested: function() {
        var formContent = this.formContent();
        if (this.model.isNew() === true) {
          crudBus.push({
            type: 'create_new_incident',
            content: this.model
          });
        }
        this.model.set(formContent);
        this.model.save();
      },

      renderChildren: function() {
        var commentForm = new CommentContainerView({
          el: '#incident-comment-block',
          content: this.model.get('incident_comments'),
          entityType: this.entityType,
        });
        var actorForm = new ActorSearchView({
          el: '#incident-actor-list-block',
          content: this.model.get('actors_role'),
          entityType: this.entityType
        });
        var eventForm = new EventContainerView({
          el: '#incident-event-block',
          content: this.model.get('times'),
          entityType: this.entityType
        });
        var bulletinSearchView = new BulletinSearchView({
          el: '#incident-bulletin-block',
          content: this.model.get('ref_bulletins'),
          entityType: this.entityType
        });
        var incidentSearchView = new IncidentSearchView({
          el: '#incident-incident-block',
          content: this.model.get('ref_incidents'),
          entityType: this.entityType
        });
        this.childViews.push(commentForm, actorForm, eventForm,
          bulletinSearchView, incidentSearchView);
      }
    });
    _.extend(IncidentFormView.prototype, ConfirmMixin);
    _.extend(IncidentFormView.prototype, WidgetMixin);
    _.extend(IncidentFormView.prototype, Formatter);

    return {
      IncidentFormView: IncidentFormView
    };
    
});
