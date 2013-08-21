/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the incident element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/map-view',
    'lib/CRUD/views/display-views/misc/comment-container',
    'lib/CRUD/views/display-views/misc/event-container',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/templates/display-templates/incident-display.tpl',
    'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, CoordinateDisplayView,
    CommentContainer, EventListView, ActorListView, BulletinListView,
    IncidentListView, incidentDisplayTmp, expandedIncidentDisplayTmp) {
    'use strict';

    var IncidentDisplayView,
        crudBus = Streams.crudBus,
        CommentListView = CommentContainer.CommentListView,
        incidentCollection = Collections.IncidentCollection;

    // ### IncidentDisplayView
    // Display and incident and all its related fields
    IncidentDisplayView = Backbone.View.extend({
      template: incidentDisplayTmp,
      className: 'Incident in-view',
      expanded: false,
      childViews: [],
      initialize: function(options) {
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = incidentCollection.get(
          options.entityDetails.id);
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        this.listenTo(this, 'resize', this.sendResizeEvent.bind(this));
        this.expanded = options.entityDetails.expanded === undefined ?
          false : options.entityDetails.expanded;
        this.expanded = !this.expanded;
        this.toggleExpanded();
      },

      displayExpandedView: function() {
        this.displayView();
      },
      displayView: function() {
        this.render()
            .renderRelatedComments()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents()
            .renderMap()
            .renderRelatedEvents();
            return this;
      },
      toggleExpanded: function() {
        if (this.expanded === true) {
          this.template = incidentDisplayTmp;
          this.expanded = false;
          this.displayView();
        }
        else {
          this.template = expandedIncidentDisplayTmp;
          this.expanded = true;
          this.displayExpandedView();
        }
      },

      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
      },

      requestEdit: function() {
        crudBus.push({
          type: 'edit_incident_request',
          content: {
            model: this.model,
            expanded: this.expanded
          }
        });
      },
      renderRelatedComments: function() {
        var commentsEl = this.$el.children()
                                 .children('.body')
                                 .children('.comments');
        var content = this.model.get('incident_comments'),
            commentContainer = new CommentListView({
              el: commentsEl,
              content: content
            });
        
        return this;
      },
      renderRelatedActors: function() {
        var actorsEl, content, roles_en, actorsContainer;
        actorsEl = this.getContainerEl('actors');
        content = this.model.get('actors');
        roles_en = this.model.get('actors_role_en');
        actorsContainer = new ActorListView({
          el: actorsEl,
          content: content,
          roles: roles_en
        });
        return this;
      },
      // get the containing el for normal and expanded view
      getContainerEl: function(className) {
        var el;
        if (this.expanded === true) {
          el = this.$el.children()
                       .children()
                       .children('.body')
                       .children('.is-' + className);
        }
        else {
          el = this.$el.children('.body')
                       .children('.' + className);
        }
        return el;
      },
      renderRelatedBulletins: function() {
        var bulletinsEl, content, bulletinsContainer;
        bulletinsEl = this.getContainerEl('bulletins');
        content = this.model.get('ref_bulletins');
        bulletinsContainer = new BulletinListView({
          el: bulletinsEl,
          content: content
        });
        return this;
      },
      renderRelatedIncidents: function() {
        var incidentsEl, content, incidentsContainer;
        incidentsEl = this.getContainerEl('incidents');
        content = this.model.get('ref_incidents');
        incidentsContainer = new IncidentListView({
          el: incidentsEl,
          content: content
        });
        return this;
      },

      renderRelatedEvents: function() {
        var eventsEl, content, incidentsContainer;
        if (this.expanded) {
          eventsEl = this.$el
                         .children()
                         .children()
                         .children('.body')
                         .children('.is-events');
        }
        else {
          eventsEl = this.$el
                         .children('.header')
                         .children('.group')
                         .children('.events');
        }
        content = this.model.get('times');
        incidentsContainer = new EventListView({
          el: eventsEl,
          content: content
        });
        return this;
      },
      renderMap: function() {
        var mapEl, content, mapContainer, collection;
        if (this.model.get('locations') !== undefined) {
          mapEl = this.getContainerEl('incident-map');
          content = _.map(this.model.get('locations'), function(uri) {
            return { resourceUri: uri };
          });
          mapContainer = new CoordinateDisplayView({
            el: mapEl,
            content: content
          });
          this.childViews.push(mapContainer);
        }
        return this;

      },

      // render the container
      render: function() {
        this.destroyChildren();
        this.$el.children().remove();
        var html = this.template({
          model: this.model.toJSON()
        });
        this.$el.html(html);
        return this;
      },

      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      }
    });

    return IncidentDisplayView;
    
});

