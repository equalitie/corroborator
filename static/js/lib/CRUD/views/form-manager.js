// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/CRUD/views/actor-form',
    'lib/CRUD/views/bulletin-form',
    'lib/CRUD/views/incident-form',
    'lib/streams',
    'lib/Data/actor',
    'lib/Data/bulletin',
    'lib/Data/incident',
    'lib/elements/overlay'
  ],
  function ($, _, Backbone, ActorForm, BulletinForm, IncidentForm, Streams, 
    Actor, Bulletin, Incident, Overlay) {

    // Object {
    // type: "action_combo_combined",
    // navValue: "incident",
    // action: true,
    // option: "Update Selected"} 
    //
    // ## Stream processing helpers
    // map nav events to the filter views we will be displaying
    var crudBus   = Streams.crudBus,
        navBus    = Streams.navBus,
        searchBus = Streams.searchBus,

        // pick the form view to match the create event
        mapCreateEventToView = function(value) {
          var createMap = {
            create_actor: {
              view: ActorForm.ActorFormView,
              model: Actor.ActorModel,
              nav  : 'actor'
              //collection: 
            },
            create_bulletin: {
              view: BulletinForm.BulletinFormView,
              model: Bulletin.BulletinModel,
              nav  : 'bulletin'
            },
            create_incident: {
              view: IncidentForm.IncidentFormView,
              model: Incident.IncidentModel,
              nav  : 'incident'
            }
          };
          return createMap[value.type];
        },

        mapEditEventToView = function(value) {
          var editMap = {
            edit_actor_request: ActorForm.ActorFormView,
            edit_bulletin_request: BulletinForm.BulletinFormView,
            edit_incident_request: IncidentForm.IncidentFormView
          };
          return {
            view: editMap[value.type],
            model: value.content.model
          };
        },

        // close embedded search box requested
        filterEmbeddedSearchClose = function(value) {
          return value.type === 'close_embedded_results';
        },

        // look for an event denoting an embedded search
        filterEmbeddedSearchRequest = function(value) {
          return value.type === 'actor-results'    ||
                 value.type === 'bulletin-results' ||
                 value.type === 'location-results' ||
                 value.type === 'media-results'    ||
                 value.type === 'incident-results';
        },

        // filter for close form request
        filterCloseRequest = function(value) {
          return value.type === 'close_form';
        },

        filterCreateRequest = function(value) {
          return value.type === 'create_actor' ||
                 value.type === 'create_bulletin' ||
                 value.type === 'create_incident';
        },

        filterEditRequest = function(value) {
          return value.type === 'edit_actor_request'    ||
                 value.type === 'edit_bulletin_request' ||
                 value.type === 'edit_incident_request';
        };

    // ### FormManagerView
    // Manage the creation and hiding of forms to save and update actors, bulletins
    // and incidents
    var FormManagerView = Backbone.View.extend({
      el: '.form_overlay',
      currentTab: '',
      currentView: undefined,
      router: undefined,
      // constructor - watch for stream events
      initialize: function() {
        this.watchSearchStream();
        this.watchCrudStream();
        this.router = new Backbone.Router();
      },

      showOverlay: function(model) {
        this.overlay = new Overlay({
          $targetEl: this.$el.children('.overlay'),
          widthOffset: 20
        });
        this.overlay.showOverlay();
      },

      hideOverlay: function() {
        this.overlay.displaySaved(this.returnToDisplayView.bind(this));
      },

      returnToDisplayView: function() {
        navBus.push({
          type: 'entity-display',
          content: {
            entity: this.model.get('entityType'),
            id: this.model.get('id')
          }
        });
        this.destroyCurrentView();
      },

      // watch for embedded searches being fired move the form position 
      // accordingly
      watchCrudStream: function() {
        var self = this;
        crudBus.filter(filterEmbeddedSearchRequest)
               .onValue(function() {
                 self.$el.children().addClass('is-middle');
               });
        crudBus.filter(filterEmbeddedSearchClose)
               .onValue(function() {
                 self.$el.children().removeClass('is-middle');
               });
      },

      // watch for a request to create an entity
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterCreateRequest)
                 .map(mapCreateEventToView)
                 .onValue(function(viewModel) {
                   self.replaceView(viewModel);
                 });
        crudBus.filter(filterEditRequest)
               .map(mapEditEventToView)
               .onValue(this.openEditView.bind(this));

        // watch for form close request
        crudBus.filter(filterCloseRequest)
                 .onValue(function() {
                   self.destroyCurrentView();
                 });
      },

      openEditView: function(value) {
        this.model = value.model;
        this.destroyCurrentView();
        this.listenForSaveEvents();
        this.currentView = new value.view({model: value.model});
        this.render();
      },

      listenForSaveEvents: function() {
        this.listenTo(this.model, 'request', this.showOverlay.bind(this));
        this.listenTo(this.model, 'sync', this.hideOverlay.bind(this));
      },

      listenForCreateEvents: function() {
        this.listenTo(this.model, 'create', this.showOverlay.bind(this));
        this.listenTo(this.model, 'sync', this.hideOverlay.bind(this));
      },

      // replace the current form view with the requested one
      replaceView: function(viewModel) {
        this.currentTab = viewModel.nav;
        this.destroyCurrentView();
        this.model = new viewModel.model({});
        this.listenForSaveEvents();
        this.currentView = new viewModel.view({model: this.model});
        this.render();
      },

      // call the destroy method on the current view
      destroyCurrentView: function() {
        this.stopListening();
        if (this.currentView !== undefined) {
          this.currentView.destroy();
          delete(this.currentView);
          this.currentView = undefined;
        }
      },
      // render the form, calls enable widgets to enable the dropdowns and
      // date widgets, this must be done after the form has rendered
      render: function() {
        this.$el.empty()
                .append(this.currentView.$el);
        this.currentView.renderChildren();
        this.currentView.enableWidgets();
      }
    });

    // module export
    return {
      FormManagerView: FormManagerView
    };
});
