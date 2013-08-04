/*global define*/
// Author: Cormac McGuire
// ### Description
// This view manages the display area, it listens for navigation events and
// displays our entities base on the path sent  
// It instantiates actor bulletin and incident views and handles their
// disposal

define (
  [
    'backbone', 'underscore',
    'lib/streams',
    'lib/CRUD/templates/display-templates/display-manager.tpl'
  ],
  function (Backbone, _, Streams, displayManagerContainerTmp) {
    'use strict';

    var DisplayManagerView,
        filterEntityNav = function() {
        };

    // ### DisplayManagerView
    // 
    DisplayManagerView = Backbone.View.extend({
      el: 'form_overlay',
      childViews: [],
      template: displayManagerContainerTmp,
      initialize: function() {
        this.watchNavEvents();
        this.watchCRUDEvents();
      },
      watchNavEvents: function() {
        this.render();
      },
      watchCRUDEvents: function() {},
      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
      }
    });

    return DisplayManagerView;
    
});

