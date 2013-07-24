// Author: Cormac McGuire

// ### Description
// Handle create update of bulletin(s)
// 

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/data/SourceCollection',
    'lib/CRUD/data/LabelCollection',
    // templates
    'lib/CRUD/templates/bulletin.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins, Source, Label,
    bulletinFormTmp) {

    var BulletinFormView,
        Formatter        = Mixins.Formatter,
        ConfirmMixin     = Mixins.ConfirmMixin,
        WidgetMixin      = Mixins.WidgetMixin,
        SourceCollectionInstance = Source.SourceCollectionInstance,
        LabelCollectionInstance = Label.LabelCollectionInstance,
        userList         = function() {
          return Bootstrap.gl_ac_users_list;
        };

    // ### BulletinFormView
    // display create/update form for bulletins
    BulletinFormView = Backbone.View.extend({
      // define events to be handled
      events: {
        'click button#bulletin-action_save': 'saveRequested',
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
      labelFields: [
        {
          containerid: '#bulletin-source-block',
          collection : SourceCollectionInstance,
          display: {
            field_name : 'sources',
            field_label: 'Sources'
          }
        },
        {
          containerid: '#bulletin-label-block',
          collection : LabelCollectionInstance,
          display: {
            field_name : 'labels',
            field_label: 'Labels'
          }
        }
      ],

      sliderFields: [
        { // confidence_score
          sliderDiv : '#bulletin-score-block .score-editor .slider',
          display   : '#bulletin_confidence_score',
          startPoint: 0,
          endPoint  : 100,
          suffix    : '%',
          marks     : [0, 50, 100],
          snap      : false,
          value     : 50 // TODO enable for update
        },
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
        
      // constructor
      initialize: function() {
        this.render();
      },

      // enable the widgets associated with this form view
      enableWidgets: function() {
        this.enableAutoCompleteFields();
        this.enableSliderFields();
        this.enableLabelFields();
      },


      // remove DOM elements and cancel event handlers
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      
      // handle clear user click
      clearUser: function(e) {
        e.preventDefault();
        $(e.currentTarget).siblings('input').val('');
      },

      // handle save click
      saveRequested: function() {
        var formContent = this.formContent();
        console.log(formContent);
      },

      // pull the data from the form
      formContent: function() {
        var formArray = $('#bulletin_form').serializeArray();
        console.log(formArray);
        return this.formArrayToData(formArray);
      },

      // render the form
      render: function() {
        var html = bulletinFormTmp();
        this.$el.empty()
                .append(html);
      }
    });

    // extend the form view with our mixins
    _.extend(BulletinFormView.prototype, ConfirmMixin);
    _.extend(BulletinFormView.prototype, WidgetMixin);
    _.extend(BulletinFormView.prototype, Formatter);

    return {
      BulletinFormView: BulletinFormView
    };
    
});
