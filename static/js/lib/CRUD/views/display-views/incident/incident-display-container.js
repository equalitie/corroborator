/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the incident element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/display-views/misc/comment-container',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/templates/display-templates/incident-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, CommentContainer, 
    ActorListView, BulletinListView, IncidentListView, incidentDisplayTmp) {
    'use strict';

    var IncidentDisplayView,
        crudBus = Streams.crudBus,
        CommentListView = CommentContainer.CommentListView,
        incidentCollection = Collections.IncidentCollection;

    // ### IncidentDisplayView
    // Display and incident and all its related fields
    IncidentDisplayView = Backbone.View.extend({
      template: incidentDisplayTmp,
      childViews: [],
      initialize: function(options) {
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = incidentCollection.superCollection.get(
          options.entityDetails.id);
        this.render()
            .renderRelatedComments()
            //.renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents();
      },
      requestEdit: function() {
        crudBus.push({
          type: 'edit_incident_request',
          content: {
            model: this.model
          }
        });
      },
      onDestroy: function() {
        this.destroyChildren();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
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
        console.log(this.model.toJSON());
        return this;
      },
      renderRelatedBulletins: function() {
        var bulletinsEl = this.$el.children()
                               .children('.body')
                               .children('.bulletins'),

            content = this.model.get('ref_bulletins'),
            bulletinsContainer = new BulletinListView({
              el: bulletinsEl,
              content: content
            });
        return this;
      },
      renderRelatedIncidents: function() {
        var incidentsEl = this.$el.children()
                               .children('.body')
                               .children('.incidents'),

            content = this.model.get('ref_incidents'),
            incidentsContainer = new IncidentListView({
              el: incidentsEl,
              content: content
            });
        return this;
      },
      render: function() {
        this.destroyChildren();
        var html = this.template({
          model: this.model.toJSON()
        });
        this.$el.html(html);
        return this;
      }
    });

    return IncidentDisplayView;
    
});

