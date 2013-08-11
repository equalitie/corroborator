/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the bulletin element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/templates/display-templates/bulletin-display.tpl',
    'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, 
    ActorListView, BulletinListView, IncidentListView,
    bulletinDisplayTmp, expandedBulletinDisplayTmp) {
    'use strict';

    var BulletinDisplayView,
        crudBus = Streams.crudBus,
        bulletinCollection = Collections.BulletinCollection;

    // ### BulletinDisplayView
    // Display and bulletin and all its related fields
    BulletinDisplayView = Backbone.View.extend({
      template: bulletinDisplayTmp,
      childViews: [],
      initialize: function(options) {
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = bulletinCollection.superCollection.get(
          options.entityDetails.id);
        this.displayView();
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
      },

      // edit button pressed 
      requestEdit: function() {
        crudBus.push({
          type: 'edit_bulletin_request',
          content: {
            model: this.model
          }
        });
      },
      displayView: function() {
        this.render()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents();
      },
      toggleExpanded: function() {
        if (this.expanded === true) {
          this.template = bulletinDisplayTmp;
          this.expanded = false;
        }
        else {
          this.template = expandedBulletinDisplayTmp;
          this.expanded = true;
        }
        this.displayView();
      },

      renderRelatedActors: function() {
        var actorsEl = this.$el.children()
                               .children('.body')
                               .children('.actors'),

            content = this.model.get('actors_role');
            //actorsContainer = new ActorListView({
              //el: actorsEl,
              //content: content
            //});
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
        if (this.expanded === true) {
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
      render: function() {
        this.destroyChildren();
        var html = this.template({
          model: this.model.toJSON()
        });
        this.destroyChildren();
        this.$el.children().remove();
        this.$el.html(html);
        return this;
      },

      // destroy child views and remove listeners
      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      }
    });

    return BulletinDisplayView;
    
});

