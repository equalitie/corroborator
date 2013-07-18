/*global define*/
// Author: Cormac McGuire
// ### Description
// Provide a date range widget for use in filter views

define (
  [
    'jquery', 'backbone', 'underscore'
  ],
  function ($, Backbone, _) {
    'use strict';
    var DateRangeView;

    // ### DateRangeView
    // Display two input boxes with from and to labels that open
    // a datepicker when clicked on
    DateRangeView = Backbone.View.extend({
      initialize: function() {
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
      }
    });
    
});



