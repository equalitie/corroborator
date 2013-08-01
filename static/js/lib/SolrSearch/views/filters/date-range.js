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
    var DateRangeView,
        searchBus = Streams.searchBus,
        DateRange = function(startDate, endDate) {
          try {
            this.startDate = moment(startDate, 'YYYY-MM-DD');
            this.endDate = moment(endDate, 'YYYY-MM-DD');
          }
          catch (e) {
          }
          return this;
        };


    DateRange.prototype = {
      setEndDate : function(endDate) {
        this.endDate = moment(endDate, 'YYYY-MM-DD');
      },

      validate: function() {
        this.passed = true;
        try {
          this.checkDatesExist();
          this.checkDatesValid();
          this.checkDateOrder();
        }
        catch (e) {
          this.passed = false;
        }
        
        return this;
      },
      // write the range to solr date range format
      toString: function() {
        return this.passed ? 
          '[' + this.startDate.toISOString() + ' TO ' +
          this.endDate.toISOString() + ']' :
          false;
      },
      toDisplayString: function() {
        return this.passed ?
          this.startDate.format('D MMM, YYYY') + ' TO ' +
          this.endDate.format('D MMM, YYYY'):
          false;
      },

      checkDateOrder: function() {
        if( this.endDate.diff(this.startDate, 'days') < 0 ) {
          throw 'start date ahead of end date';
        }
      },    

      checkDatesExist: function() {
        if ( this.startDate === null || this.endDate === null) {
          throw 'invalid date entered';
        }
      },
      checkDatesValid: function() {
        if (!(this.startDate.isValid() && this.endDate.isValid())) {
          throw 'invalid date entered';
        }
      }
    };

    // ### DateRangeView
    // Display two input boxes with from and to labels that open
    // a datepicker when clicked on
    DateRangeView = Backbone.View.extend({
      startDate: undefined,
      endDate  : undefined,
      entityType: '',
      initialize: function(options) {
        if (options.entityType !== undefined) {
          this.entityType = options.entityType;
        }
        else {
          throw 'entityType required by Date range view';
        }
        
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
            self.startDate = selectedDate;
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
            self.endDate = selectedDate;
            self.checkFilters();
          }
        });

      },

      checkFilters: function() {
        var dr = new DateRange(this.startDate, this.endDate);
        if (dr.validate().passed ) {
          // we have a valid date range
          searchBus.push({
            type: 'filter_event_' + this.entityType,
            content: {
              filter:this.createFilterModel(dr.toString(), dr.toDisplayString())
            }
          });
        }
      },

      createFilterModel: function(filterString, filterDisplay) {
        var model = new Backbone.Model({
          key              : this.entityType + '_created_exact',
          type             : this.entityType,
          dateFilter       : true,
          filterName       : filterString,
          displayFilterName: filterDisplay
        });
        return model;
      },


      applyFilter:function() {

      },
      render: function() {
        var html = dateRangeTmp();
        this.$el.append(html).addClass('filter');
      }
    });
    return {
      DateRangeView: DateRangeView,
      DateRange: DateRange
    };
    
});



