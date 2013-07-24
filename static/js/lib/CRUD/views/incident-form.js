// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    // templates
    'lib/CRUD/data/LabelCollection',
    'lib/CRUD/data/CrimeCollection',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/templates/incident.tpl'
  ],
  function ($, _, Backbone, Streams, Label, Crime, Mixins, incidentFormTmp) {

    var IncidentFormView,
        Formatter    = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin,
        WidgetMixin  = Mixins.WidgetMixin,
        LabelCollectionInstance = Label.LabelCollectionInstance,
        CrimeCollectionInstance = Crime.CrimeCollectionInstance,
        userList     = function() {
          console.log(Bootstrap.gl_ac_users_list);
          return Bootstrap.gl_ac_users_list;
        };

    // ### IncidentFormView
    // display create/update form for incidents
    IncidentFormView = Backbone.View.extend({
      events: {
        'click button#incident-action_save': 'saveRequested',
        'click button#clear-user'          : 'clearUser',
        'click button.do-hide': 'requestCloseForm'
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
      labelFields: [
        {
          containerid: '#incident-crime-block',
          collection : CrimeCollectionInstance,
          display: {
            field_name : 'crimes',
            field_label: 'Crimes'
          }
        },
        {
          containerid: '#incident-label-block',
          collection : LabelCollectionInstance,
          display: {
            field_name : 'labels',
            field_label: 'Labels'
          }
        }
      ],
      sliderFields: [
        { // confidence_score
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
      ],

      initialize: function() {
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
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = incidentFormTmp();
        this.$el.empty()
                .append(html);
      },
      // pull the data from the form
      formContent: function() {
        var formArray = $('#incident_form').serializeArray();
        return this.formArrayToData(formArray);
      },
      saveRequested: function() {
        var formContent = this.formContent();
        console.log(formContent);
      }
    });
    _.extend(IncidentFormView.prototype, ConfirmMixin);
    _.extend(IncidentFormView.prototype, WidgetMixin);
    _.extend(IncidentFormView.prototype, Formatter);

    return {
      IncidentFormView: IncidentFormView
    };
    
});
