/*global globals*/
// Author: Cormac McGuire
// ### Description
// Embedded search results container, can be added to an entity

define (
  [
    'backbone', 'underscore'
  ],
  function (Backbone, _) {
    'use strict';
    var EmbeddedSearchResultsView;
    // ### EmbeddedSearchResultsView
    // 
    EmbeddedSearchResultsView = Backbone.View.extend({
      childViews: [],
      initialize: function() {
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
      },
      render: function() {
      }
    });
    
});

