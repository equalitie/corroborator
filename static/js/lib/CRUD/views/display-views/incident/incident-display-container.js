/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the incident element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/map-view',
    'lib/CRUD/views/display-views/comment/comment-container',
    'lib/CRUD/views/display-views/misc/event-container',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/templates/display-templates/incident-display.tpl',
    'lib/CRUD/templates/display-templates/incident/expanded-incident-display.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, Collections, Streams, CoordinateDisplayView,
    CommentListView, EventListView, ActorListView, BulletinListView,
    IncidentListView, incidentDisplayTmp, expandedIncidentDisplayTmp, i18n) {
    'use strict';

    var IncidentDisplayView,
        crudBus = Streams.crudBus,
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
        this.model = incidentCollection.getEntity(options.entityDetails.id, 'incident');
        this.listenTo(this.model, 'sync', this.displayView.bind(this));
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
      renderRelatedActors: function() {
        var actorsEl, content, roles_en, actorsContainer;
        actorsEl = this.getContainerEl('actors');
        content = this.model.get('actors');
        roles_en = this.model.get('actor_roles_status');
        actorsContainer = new ActorListView({
          el: actorsEl,
          content: content,
          roles: roles_en
        });
        _.each(actorsContainer.childViews, function(childView) {
          childView.selectInitialLanguage();
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
        if (this.model.get('locations') !== undefined &&
            this.model.get('locations').length > 0) {
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
          model: this.model.toJSON(),
          i18n: i18n
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

