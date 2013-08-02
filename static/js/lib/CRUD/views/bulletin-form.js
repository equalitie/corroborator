// Author: Cormac McGuire

// ### Description
// Handle create update of bulletin(s)

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/views/search-views/bulletin/bulletin-search-field',
    'lib/CRUD/views/search-views/media/media-search-field',
    'lib/CRUD/data/SourceCollection',
    'lib/CRUD/data/LabelCollection',
    'lib/CRUD/data/LocationCollection',
    // child views
    'lib/CRUD/views/comment-form',
    'lib/CRUD/views/event-form',
    // templates
    'lib/CRUD/templates/bulletin.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins,
    ActorSearchView, BulletinSearchView, MediaSearchView,
    // data
    Source, Label, Location,
    // views
    CommentForm, EventForm,
    bulletinFormTmp) {

    var BulletinFormView,
        crudBus              = Streams.crudBus,
        Formatter            = Mixins.Formatter,
        ConfirmMixin         = Mixins.ConfirmMixin,
        WidgetMixin          = Mixins.WidgetMixin,
        CommentContainerView = CommentForm.CommentContainerView,
        EventContainerView   = EventForm.EventContainerView,
        SourceCollection     = Source.SourceCollection,
        LabelCollection      = Label.LabelCollection,
        LocationCollection   = Location.LocationCollection,

        userList = function() {
          return Bootstrap.gl_ac_users_list;
        };

    // ### BulletinFormView
    // display create/update form for bulletins
    BulletinFormView = Backbone.View.extend({
      entityType: 'bulletin',
      // class name for all input fields to be processed as a bulletin
      // allows us to nest fields that and exclude them from the 
      // serialised array
      formElClass: 'bulletin-field',
      //store a reference to our child views so we can destroy them
      childViews: [],
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
          collection : SourceCollection,
          display: {
            field_name : 'sources',
            field_label: 'Sources'
          }
        },
        {
          containerid: '#bulletin-label-block',
          collection : LabelCollection,
          display: {
            field_name : 'labels',
            field_label: 'Labels'
          }
        },
        {
          containerid: '#bulletin-location-block',
          collection : LocationCollection,
          display: {
            field_name : 'locations',
            field_label: 'Locations'
          }
        },

      ],

      // display a slider for scores
      sliderFields: [
        { // confidence_score
          sliderDiv : '#bulletin-score-block .score-editor .slider',
          display   : '#bulletin_confidence_score',
          formField : 'confidence_score',
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
        this.childViews = [];
        this.render();
      },

      // remove DOM elements and cancel event handlers
      onDestroy: function() {
        this.disableWidgets();
        this.destroyChildViews();
      },
      
      // destroy the sub views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
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
        if (this.model !== undefined) {
          this.model.save();
        }
        else {
          crudBus.push({
            type: 'create_new_bulletin',
            content: formContent
          });
        }
      },

      // render out the child views - comment form, event form, add location,
      // add media, add actors, add related bulletins
      renderChildren: function() {
        var commentForm = new CommentContainerView({
          el: '#bulletin-comment-block',
          entityType: 'bulletin'
        });

        var eventForm = new EventContainerView({
          el: '#bulletin-event-block',
          entityType: 'bulletin'
        });

        var actorSearchView = new ActorSearchView({
          el: '#bulletin-actor-list-block',
          entityType: 'bulletin'
        });

        var bulletinSearchView = new BulletinSearchView({
          el: '#bulletin-bulletin-block',
          entityType: 'bulletin'
        });

        var mediaSearchView = new MediaSearchView({
          el: '#bulletin-media-block',
          entitytype: 'bulletin'
        });


        // add each new view to the child views array
        this.childViews.push(
          commentForm,
          eventForm,
          actorSearchView,
          bulletinSearchView
        );
        return this;
      },

      // render the form
      render: function() {
        var html = bulletinFormTmp();
        this.$el = $(html);
        return this;
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
