/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the incident element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/display-views/misc/comment-container',
    'lib/CRUD/views/display-views/misc/event-container',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/templates/display-templates/incident-display.tpl',
    'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, CommentContainer, 
    EventListView,
    ActorListView, BulletinListView, IncidentListView,
    incidentDisplayTmp, expandedIncidentDisplayTmp) {
    'use strict';

    var IncidentDisplayView,
        crudBus = Streams.crudBus,
        CommentListView = CommentContainer.CommentListView,
        incidentCollection = Collections.IncidentCollection;

    // ### IncidentDisplayView
    // Display and incident and all its related fields
    IncidentDisplayView = Backbone.View.extend({
      template: incidentDisplayTmp,
      expanded: false,
      childViews: [],
      initialize: function(options) {
        console.log('init incident');
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = incidentCollection.superCollection.get(
          options.entityDetails.id);
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        this.displayView();
      },

      displayExpandedView: function() {
        this.displayView()
            .renderRelatedEvents();
      },
      displayView: function() {
        this.render()
            .renderRelatedComments()
            //.renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents();
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
      requestEdit: function() {
        crudBus.push({
          type: 'edit_incident_request',
          content: {
            model: this.model
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
        var actorsEl = this.$el.children()
                               .children('.body')
                               .children('.actors'),
            content = this.model.get('actors_role'),
            roles_en = this.model.get('actors_role_en'),
            actorsContainer = new ActorListView({
              el: actorsEl,
              content: content,
              roles: roles_en
            });
        return this;
      },
      getBulletinEl: function() {
        var bulletinsEl;
        if (this.expanded === true) {
          bulletinsEl = this.$el.children()
                             .children()
                             .children('.body')
                             .children('.is-bulletins');
        }
        else {
          bulletinsEl = this.$el.children()
                             .children('.body')
                             .children('.bulletins');
        }
        return bulletinsEl;
      },
      renderRelatedBulletins: function() {
        var bulletinsEl = this.getBulletinEl(),
            content = this.model.get('ref_bulletins'),
            bulletinsContainer = new BulletinListView({
              el: bulletinsEl,
              content: content
            });
        return this;
      },
      getIncidentsEl: function() {
        var incidentsEl;
        if (this.expanded === false) {
          incidentsEl = this.$el.children()
                             .children('.body')
                             .children('.incidents');
        }
        else {
          incidentsEl = this.$el.children()
                             .children()
                             .children('.body')
                             .children('.is-incidents');
        }
        return incidentsEl;
      },
      renderRelatedIncidents: function() {
        var incidentsEl = this.getIncidentsEl(),
            content = this.model.get('ref_incidents'),
            incidentsContainer = new IncidentListView({
              el: incidentsEl,
              content: content
            });
        return this;
      },

      renderRelatedEvents: function() {
        var eventsEl, content, incidentsContainer;
        eventsEl = this.$el
                       .children()
                       .children()
                       .children('.body')
                       .children('.is-events');
        content = this.model.get('times');
        incidentsContainer = new EventListView({
          el: eventsEl,
          content: content
        });
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

