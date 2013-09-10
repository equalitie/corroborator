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
    'lib/CRUD/views/map-view',
    'lib/CRUD/templates/display-templates/bulletin-display.tpl',
    'lib/CRUD/templates/display-templates/bulletins/expanded-bulletin-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, 
    ActorListView, BulletinListView, IncidentListView, MediaListView, CoordinateDisplayView,
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
        this.addi18n();
        if (options.entityDetails === undefined) {
          throw new Error('you must define entityDetails');
        }
        this.model = bulletinCollection.get(
          options.entityDetails.id);
        this.listenTo(this, 'expand', this.toggleExpanded.bind(this));
        this.listenTo(this, 'resize', this.sendResizeEvent.bind(this));
        this.expanded = options.entityDetails.expanded === undefined ?
          false : options.entityDetails.expanded;
        this.expanded = !this.expanded;
        this.toggleExpanded();
      },

      // edit button pressed 
      requestEdit: function() {
        crudBus.push({
          type: 'edit_bulletin_request',
          content: {
            model: this.model,
            expanded: this.expanded
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
            .renderRelatedIncidents()
            .renderMap();
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

      sendResizeEvent: function() {
        _.each(this.childViews, function(view) {
          view.trigger('resize');
        });
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
          el = this.$el.children()
                       .children('.body')
                       .children('.' + className);
        }
        return el;
      },
      // render the related actors
      renderRelatedActors: function() {
        var actorsEl, actorsContainer, content;
        actorsEl = this.getContainerEl('actors');
        content = this.model.get('actors');
        actorsContainer = new ActorListView({
          el: actorsEl,
          content: content
          //roles
        });
        return this;
      },

      // render the related bulletins
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

      // render the related incidents
      renderRelatedIncidents: function() {
        var incidentsEl, content, incidentsContainer; 
        incidentsContainer = this.getContainerEl('incidents');
        content = this.model.get('ref_incidents');
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
      renderMap: function() {
        var mapEl, content, mapContainer, collection;
        mapEl = this.getContainerEl('bulletin-map');
        if (this.model.get('locations') !== undefined &&
            this.model.get('locations').length > 0) {
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

