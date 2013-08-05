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
    'lib/streams'
  ],
  function ($, _, Backbone, ActorForm, BulletinForm, IncidentForm, Streams) {

    // ## Stream processing helpers
    // map nav events to the filter views we will be displaying
    var crudBus = Streams.crudBus,
        searchBus = Streams.searchBus,

        // pick the form view to match the create event
        mapCreateEventToView = function(value) {
          var createMap = {
            create_actor: ActorForm.ActorFormView,
            create_bulletin: BulletinForm.BulletinFormView,
            create_incident: IncidentForm.IncidentFormView
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
      currentView: undefined,
      // constructor - watch for stream events
      initialize: function() {
        this.watchSearchStream();
        this.watchCrudStream();
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
                 .onValue(function(view) {
                   self.replaceView(view);
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
        this.destroyCurrentView();
        this.currentView = new value.view({model: value.model});
        this.render();
      },

      // replace the current form view with the requested one
      replaceView: function(View) {
        this.destroyCurrentView();
        this.currentView = new View();
        this.render();
      },
      // call the destroy method on the current view
      destroyCurrentView: function() {
        
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
