/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the bulletin element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/streams',
    'lib/CRUD/templates/display-templates/bulletin-display.tpl'
  ],
  function (Backbone, _, Collections, Streams, bulletinDisplayTmp) {
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
        return this;
      },
      renderRelatedIncidents: function() {
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

