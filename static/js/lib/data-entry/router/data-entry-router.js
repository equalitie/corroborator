/*global require*/
// Author: Cormac McGuire
// Created: 2013-12-17
// ### Description: router for data entry
// 

define(
  [
    'backbone',
    'lib/
  ],
  function (Backbone) {
  'use strict';

  var DataEntryRouter = Backbone.Router.extend({
    routes: {
      '/'           : 'showIncidentForm',
      'tab/incident': 'showIncidentForm',
      'tab/bulletin': 'showBulletinForm',
    },
    showIncidentForm: function() {
    },
    showBulletinForm: function() {
    }
  });

  return DataEntryRouter;

  
});
