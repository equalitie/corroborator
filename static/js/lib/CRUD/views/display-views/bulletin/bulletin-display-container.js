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
    'lib/CRUD/templates/display-templates/bulletin-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, 
    ActorListView, BulletinListView, IncidentListView, bulletinDisplayTmp) {
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
        this.render()
            .renderRelatedActors()
            .renderRelatedBulletins()
            .renderRelatedIncidents();
      },
      requestEdit: function() {
        crudBus.push({
          type: 'edit_bulletin_request',
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
      renderRelatedActors: function() {
        //var relatedBulletins = this.model.get('re
        //if (this.get('
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

    return BulletinDisplayView;
    
});

