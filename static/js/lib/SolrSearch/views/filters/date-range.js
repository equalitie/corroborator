/*global define*/
// Author: Cormac McGuire
// ### Description
// Provide a date range widget for use in filter views

define (
  [
    'jquery', 'backbone', 'underscore',
    'lib/streams',
    'lib/SolrSearch/templates/date-range.tpl'
  ],
  function ($, Backbone, _, Streams, dateRangeTmp) {
    'use strict';
    var DateRangeView;

    // ### DateRangeView
    // Display two input boxes with from and to labels that open
    // a datepicker when clicked on
    DateRangeView = Backbone.View.extend({
      className: 'filter',
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = dateRangeTmp();
        this.$el.append(html);
      }
    });
    return DateRangeView;
    
});



