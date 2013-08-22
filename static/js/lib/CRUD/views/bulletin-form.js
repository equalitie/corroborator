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
    // templates/search-templates
    'lib/CRUD/templates/search-templates/bulletin/bulletin.tpl'
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
      className: 'bulletin-overlay overlay WIREFRAME',
      entityType: 'bulletin',
      // class name for all input fields to be processed as a bulletin
      // allows us to nest fields that and exclude them from the 
      // serialised array
      formElClass: 'bulletin-field',
      template: bulletinFormTmp,
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
      labelFields: {
        sources: {
          containerid: '#bulletin-source-block',
          collection : SourceCollection,
          multiple: true,
          display: {
            field_name : 'sources',
            field_label: 'Sources'
          },
          content: {
            values: 'sources',
            labels: 'bulletin_sources'
          }
        },
        labels: {
          containerid: '#bulletin-label-block',
          collection : LabelCollection,
          multiple: true,
          display: {
            field_name : 'labels',
            field_label: 'Labels'
          },
          content: {
            values: 'labels',
            labels: 'bulletin_labels'
          }
        },
        locations: {
          containerid    : '#bulletin-location-block',
          collection     : LocationCollection,
          multiple       : true,
          bus            : crudBus,
          eventIdentifier: 'bulletin_map',
          display: {
            field_name : 'locations',
            field_label: 'Locations'
          },
          content: {
            values: 'locations',
            labels: 'bulletin_locations'
          }
        }

      },
      mapFields: [
        {
          containerid: '#bulletin-map-block',
          locationSource: 'bulletin_map_label',
          bus: crudBus
        }
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
      initialize: function(options) {
        this.addi18n();
        this.populateWidgets();
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        // a little trickery here 
        this.expanded = ! options.expanded;
        this.multiple = options.multiple;
        this.model.set('bulletins', options.selected);
        this.displayForm = this.displayFormFunction();
      },

      // toggle the expanded switch and render the form
      toggleExpanded: function() {
        this.displayForm();
        var $body = this.$el.children('.body')
                            .children('.Bulletin');

        if (this.expanded === true) {
          this.$el.removeClass('is-expanded');
          $body.children('.first')
               .removeClass('span-66p');
          $body.children('.last')
               .removeClass('span-33p');
          $body.removeClass('is-expanded');
          this.expanded = false;
        }
        else {
          this.$el.addClass('is-expanded');
          $body.children('.first')
               .addClass('span-66p');
          $body.children('.last')
               .addClass('span-33p');
          $body.addClass('is-expanded');
          this.expanded = true;
        }
        if (this.multiple === true) {
          this.hideMultipleElements();
        }
        this.sendResizeEvent();
      },

      hideMultipleElements: function() {
        $('.hide-multiple').remove();
      },

      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
      },

      // return a function that creates the form only once
      displayFormFunction: function() {
        return _.once(function() {
          this.render()
              .renderChildren()
              .enableWidgets();
        });
      },

      // remove DOM elements and cancel event handlers
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

      // handle clear user click
      clearUser: function(e) {
        e.preventDefault();
        $(e.currentTarget).siblings('input').val('');
      },

      // handle save click
      saveRequested: function() {
        var formContent = this.formContent();
        this.model.set(formContent);
        if (this.model.isNew() === true) {
          crudBus.push({
            type: 'create_new_bulletin',
            content: this.model
          });
        }
        if (this.multiple === true) {
          this.model.set('actors', this.actorSearchView.collection);
          this.model.saveMultiple();
        }
        else {
          this.model.save();
        }
      },

      // render out the child views - comment form, event form, add location,
      // add media, add actors, add related bulletins
      renderChildren: function() {
        var commentForm = new CommentContainerView({
          el: '#bulletin-comment-block',
          content: this.model.get('bulletin_comments'),
          entityType: 'bulletin'
        });

        var eventForm = new EventContainerView({
          el: '#bulletin-event-block',
          content: this.model.get('times'),
          entityType: 'bulletin'
        });

        var actorSearchView = new ActorSearchView({
          el: '#bulletin-actor-list-block',
          content: this.model.get('actors_role'),
          entityType: 'bulletin',
          relationshipType: 'role'
        });
        this.actorSearchView  = actorSearchView;

        var bulletinSearchView = new BulletinSearchView({
          el: '#bulletin-bulletin-block',
          content: this.model.get('ref_bulletins'),
          entityType: 'bulletin'
        });

        var mediaSearchView = new MediaSearchView({
          el        : '#bulletin-media-block',
          content   : this.model.get('medias'),
          multiple  : true,
          entityType: 'bulletin',
          label     : 'Related media',
          name      : 'medias'
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
        var html = this.template({model: this.model.toJSON()});
        this.$el.html(html);
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
