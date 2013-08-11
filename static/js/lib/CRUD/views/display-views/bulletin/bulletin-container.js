/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the list of related bulletins

define (
  [
    'backbone',
    'lib/Data/bulletin',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/bulletins/bulletin-container.tpl',
    'lib/CRUD/templates/display-templates/bulletins/bulletin.tpl'

  ],
  function (Backbone, Bulletin, CollectionViews, bulletinContainerTmp, bulletinTmp) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        BulletinListView, BulletinView,
        BulletinModel = Bulletin.BulletinModel;

    BulletinView = ModelView.extend({
      template: bulletinTmp
    });

    // ### BulletinListView
    // Display a list of bulletins
    BulletinListView = ListLoadView.extend({
      childViews: [],
      modelType: BulletinModel,
      childView: BulletinView,
      fieldType: 'bulletins',
      containerTmp: bulletinContainerTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }
    });


    return BulletinListView;
    
});

