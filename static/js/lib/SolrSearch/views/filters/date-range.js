/*global define*/
// Author: Cormac McGuire
// ### Description
// Provide a date range widget for use in filter views

define (
  [
    'jquery', 'bacon', 'backbone', 'underscore', 'moment',
    'lib/streams',
    'lib/SolrSearch/templates/date-range.tpl'
  ],
  function ($, Bacon, Backbone, _, moment, Streams, dateRangeTmp) {
    'use strict';
    var DateRangeView;

    // ### DateRangeView
    // Display two input boxes with from and to labels that open
    // a datepicker when clicked on
    DateRangeView = Backbone.View.extend({
      fromDate: undefined,
      toDate  : undefined,
      initialize: function() {
        this.render();
        this.createDatePickers();
      },
      createDatePickers: function() {
        var self = this;
        this.$el.children('.from-date').datepicker({
          defaultDate: '-1w',
          changeMonth: true,
          dateFormat: 'yy-mm-dd',
          numberOfMonths: 1,
          onClose: function(selectedDate) {
            $('.to-date').datepicker('option', 'minDate', selectedDate);
            self.fromDate = selectedDate;
            self.checkFilters();
          }
        });
        this.$el.children('.to-date').datepicker({
          defaultDate: '+1w',
          changeMonth: true,
          dateFormat: 'yy-mm-dd',
          numberOfMonths: 1,
          onClose: function(selectedDate) {
            $('.from-date').datepicker('option', 'maxDate', selectedDate);
            self.toDate = selectedDate;
            self.checkFilters();
          }
        });
      },

      checkFilters: function() {
        var startDate = moment(this.startDate, "YYYY-MM-DD"),
            endDate   = moment(this.endDate,  "YYYY-MM-DD");
        
      },


      applyFilter:function() {

      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = dateRangeTmp();
        this.$el.append(html).addClass('filter');
      }
    });
    return DateRangeView;
    
});



