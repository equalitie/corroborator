/*global require*/
// Author: Cormac McGuire
// Created: 2013-12-17
// ### Description: router for data entry
// 

define(
  [
    'backbone',
    'lib/data-entry/views/actor-form',
    'lib/data-entry/views/bulletin-form',
  ],
  function (Backbone, ActorFormView, BulletinFormView) {
  'use strict';
  var el = '',
      actorFormView = new ActorFormView({el: '#actor-form'}),
      bulletinFormView = new BulletinFormView({el: '#bulletin-form'});

  var DataEntryRouter = Backbone.Router.extend({
    routes: {
      ''           : 'showBulletinForm',
      'tab/actor'   : 'showActorForm',
      'tab/bulletin': 'showBulletinForm',
    },
    showActorForm: function() {
      this.setActorAsCurrentTab();
      actorFormView.show();
      bulletinFormView.hide();
    },
    showBulletinForm: function() {
      this.setBulletinAsCurrentTab();
      actorFormView.hide();
      bulletinFormView.show();
    },
    // these should really be in a view
    getUl: function() {
      this.$ul = this.$ul || $('.tabs').children('ul');
      return this.$ul;
    },
    setBulletinAsCurrentTab: function() {
      this.getUl().children('.is-bulletins')
                  .addClass('current')
                  .siblings()
                  .removeClass('current');
    },
    setActorAsCurrentTab: function() {
      this.getUl().children('.is-actors')
                  .addClass('current')
                  .siblings()
                  .removeClass('current');
    }

  });

  return DataEntryRouter;

  
});
