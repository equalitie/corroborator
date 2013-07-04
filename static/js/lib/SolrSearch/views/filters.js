/*global define, Bacon */
// ### filters.js
// 
// This displays the filter view  
// it provides:  
// filtering for the search results
// The FilterManagerView handles creation/deletion of the different views
// There are then three individual views to handle the different filters

define(
  [
    // vendor
    'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    // elements
    'lib/elements/combo',
    //data
    'lib/Data/collections',
    // templates
    'lib/SolrSearch/templates/actor-filters.tpl',
    'lib/SolrSearch/templates/bulletin-filters.tpl',
    'lib/SolrSearch/templates/incident-filters.tpl'
  ],
  function ($, Backbone, Handlebars, Streams, Combo, Collections,
    actorFiltersTmp, bulletinFiltersTmp, incidentFiltersTmp) {
    'use strict';
    var FilterManagerView,
        ActorFilterView,
        BulletinFilterView,
        IncidentFilterView;

    // ## Stream processing helpers
    // map nav events to the filter views we will be displaying
    var mapNavToView = function(value) {
      var navMap = {
        actor: ActorFilterView,
        bulletin: BulletinFilterView,
        incident: IncidentFilterView
      };
      return navMap[value];
    };

    // ## FilterManagerView
    // manage creation/deletion of views
    FilterManagerView = Backbone.View.extend({
      el: '.right-filters',
      currentView: undefined,
      initialize: function() {
        this.watchNavStream();
      },
      // watch the navigation stream  
      // map navigation events to the view that needs to be rendered  
      // call the replace view function with the next view to be instantiated
      // and rendered
      watchNavStream: function() {
        var self = this;
        Streams.navBus.map(mapNavToView)
                      .onValue(function (view) {
                        self.replaceView(view);
                      });
      },

      // destroy the currently rendered child view and replace it with the
      // next one to be displayed
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
      // render the child view
      render:function() {
        this.$el.empty()
                .append(this.currentView.$el);
      }
    });

    // ## Actor filter view
    // display a list of filters for actors
    ActorFilterView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.undelegateEvents();
        this.$el.remove();
      },
      render: function() {
        var html = actorFiltersTmp();
        this.$el.append(html);
      }
    });


    // ## Bulletin filter view
    // display a list of filters for bulletins
    BulletinFilterView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.undelegateEvents();
        this.$el.remove();
      },
      render: function() {
        var html = bulletinFiltersTmp();
        this.$el.append(html);
      }
    });


    // ## Incident filter view
    // display a list of filters for incidents
    IncidentFilterView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.undelegateEvents();
        this.$el.remove();
      },
      render: function() {
        var html = incidentFiltersTmp();
        this.$el.append(html);
      }
    });

    // module export
    return {
      FilterManagerView : FilterManagerView,
      ActorFilterView   : ActorFilterView,
      BulletinFilterView: BulletinFilterView,
      IncidentFilterView: IncidentFilterView
    };
});
