/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the bulletin element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections', 'lib/streams',

    'lib/CRUD/views/display-views/actor/actor-container',
    'lib/CRUD/views/display-views/bulletin/bulletin-container',
    'lib/CRUD/views/display-views/incident/incident-container',
    'lib/CRUD/views/display-views/media/media-container',
    'lib/CRUD/templates/display-templates/bulletin-display.tpl',
    'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, 
    ActorListView, BulletinListView, IncidentListView, MediaListView,
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

      // render expanded view
      displayExpandedView: function() {
        this.displayView()
            .renderRelatedMedia();
      },

      // display view and standard elements
      displayView: function() {
        this.render()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents();
        return this;
      },

      // switch betwee preview and expanded view
      toggleExpanded: function() {
        if (this.expanded === true) {
          this.template = bulletinDisplayTmp;
          this.expanded = false;
          this.displayView();
        }
        else {
          this.template = expandedBulletinDisplayTmp;
          this.expanded = true;
          this.displayExpandedView();
        }
      },

      // render the related actors
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

      // get the bulletin containing el for normal and expanded view
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

      // render the related bulletins
      renderRelatedBulletins: function() {
        var bulletinsEl = this.getBulletinEl(),

            content = this.model.get('ref_bulletins'),
            bulletinsContainer = new BulletinListView({
              el: bulletinsEl,
              content: content
            });
        return this;
      },

      // get the el that will hold our incidents
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

      // render the related incidents
      renderRelatedIncidents: function() {
        var incidentsEl = this.getIncidentsEl(),
            content = this.model.get('ref_incidents'),
            incidentsContainer = new IncidentListView({
              el: incidentsEl,
              content: content
            });
        return this;
      },

      // render the related incidents
      renderRelatedMedia: function() {
        var content, mediaEl, mediaView;
        mediaEl = this.$el.children()
                          .children()
                          .children('.body')
                          .children('.is-media');
        content = this.model.get('medias');
        mediaView = new MediaListView({
          el: mediaEl,
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

      // destroy child views and remove listeners
      onDestroy: function() {
        this.stopListening();
        this.destroyChildren();
      },

      // invoke destroy on all child views and clear the array
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      }
    });

    return BulletinDisplayView;
    
});

