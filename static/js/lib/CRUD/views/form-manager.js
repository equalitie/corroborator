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
    var mapCreateEventToView = function(value) {
      var createMap = {
        create_actor: ActorForm.ActorFormView,
        create_bulletin: BulletinForm.BulletinFormView,
        create_incident: IncidentForm.IncidentFormView
      };
      return createMap[value.type];
    };
    var filterCreateRequest = function(value) {
      return value.type === 'create_actor' ||
             value.type === 'create_bulletin' ||
             value.type === 'create_incident';
    };

    // ### FormManagerView
    // Manage the creation and hiding of forms to save and update actors, bulletins
    // and incidents
    var FormManagerView = Backbone.View.extend({
      el: '.form_overlay',
      currentView: undefined,
      initialize: function() {
        this.watchSearchStream();
      },
      watchSearchStream: function() {
        var self = this;
        Streams.searchBus.filter(filterCreateRequest)
                         .map(mapCreateEventToView)
                         .onValue(function(view) {
                           self.replaceView(view);
                         });
      },
      replaceView: function(View) {
        this.destroyCurrentView();
        this.currentView = new View();
        this.render();
      },
      // call the destroy method on the current view
      destroyCurrentView: function() {
        if (this.currentView !== undefined) {
          this.currentView.destroy();
        }
      },
      render: function() {
        this.$el.empty()
                .append(this.currentView.$el);
      }
    });


    // module export
    return {
      FormManagerView: FormManagerView
    };
});
