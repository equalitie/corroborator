/*global define*/
// Author: Cormac McGuire
// ### Description
// This view manages the display area, it listens for navigation events and
// displays our entities base on the path sent  
// It instantiates actor bulletin and incident views and handles their
// disposal

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/views/display-views/actor/actor-display-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-display-container',
    'lib/CRUD/views/display-views/incident/incident-display-container',
    'lib/CRUD/templates/display-templates/display-manager.tpl'
  ],
  function (Backbone, _, Streams,
    ActorDisplayView, BulletinDisplayView, IncidentDisplayView,
    displayManagerContainerTmp) {
    'use strict';

    var DisplayManagerView,
        navBus = Streams.navBus,
        viewMap = {
          actor: ActorDisplayView,
          bulletin: BulletinDisplayView,
          incident: IncidentDisplayView
        },
        extractEntity = function(value) {
          return value.content;
        },
        filterEntityNav = function(value) {
          return value.type === 'entity-display';
        };

    // ### DisplayManagerView
    // 
    DisplayManagerView = Backbone.View.extend({
      template: displayManagerContainerTmp,
      el: '.form_overlay',
      childViews: [],
      events: {
        'click .do-hide': 'closeViewRequested'
      },

      initialize: function() {
        this.watchNavEvents();
        this.watchCRUDEvents();
      },

      closeViewRequested: function(evt) {
        evt.preventDefault();
        this.destroyChildren();
        this.$el.children().remove();
      },

      watchNavEvents: function() {
        navBus.filter(filterEntityNav)
              .map(extractEntity)
              .onValue(this.displayEntity.bind(this));
      },
      displayEntity: function(content) {
        this.renderContainer()
            .renderEntity(content);
      },
      watchCRUDEvents: function() {},
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      renderEntity: function(entityDetails) {
        var displayView = new viewMap[entityDetails.entity]({
          entityDetails: entityDetails
        });
        this.$el.children()
                .children('.body')
                .append(displayView.$el);

        this.childViews.push(displayView);
        return this;
      },
      renderContainer: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
        return this;
      }
    });

    return DisplayManagerView;
    
});

