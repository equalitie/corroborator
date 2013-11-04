/*global define*/
// Author: Cormac McGuire
// ### Description: 
// Display the revisions for this entity

define(
  [
    'backbone',
    'lib/CRUD/search-templates/revision/revision-container.tpl'
  ],
  function (Backbone, revisionContainerTmp) {
  'use strict';
  
  var RevisionView;

  // ###RevisionView
  // Display the Revisions for an entity
  // accepts a collection of revisions
  RevisionView = Backbone.View.extend({
    template: revisionContainerTmp,
    initialize: function (options) {

    },
    render: function() {
      this.$el.html(this.template());
    }
  });


  return RevisionView;
});

