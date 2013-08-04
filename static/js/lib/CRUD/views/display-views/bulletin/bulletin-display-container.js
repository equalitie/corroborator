/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the bulletin element and it's related content

define (
  [
    'backbone', 'underscore', 'lib/Data/collections',
    'lib/CRUD/templates/display-templates/bulletin-display.tpl'
  ],
  function (Backbone, _, Collections, bulletinDisplayTmp) {
    'use strict';

    var BulletinDisplayView,
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
        console.log(this.model.toJSON());
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

