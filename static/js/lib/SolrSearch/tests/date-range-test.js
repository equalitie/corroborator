/*global define, buster*/
// Author: Cormac McGuire
// ### Description
// test the date range view

define (
  [
    'moment',
    'lib/SolrSearch/views/filters/date-range',
    'lib/streams'
  ],
  function (moment, dateRangeView, Streams) {
    'use strict';
    var searchBus = Streams.searchBus,
        assert    = buster.assert,
        DateRange = dateRangeView.DateRange;

    buster.testCase('Date Range view', {
      setUp: function() {
      },
      'should pass a valid date range': function() {
          var startDate = '2012-11-30',
              endDate = '2012-12-27';

          var dr = new DateRange(startDate, endDate);
          assert.equals(dr.validate().passed, true);
      },
      'should check both dates exist': function() {
        var startDate = '2012-11-30',
            endDate = '';

        var dr = new DateRange(startDate, endDate);
        
        assert.equals(dr.validate().passed, false);
      },
      'should check both dates are valid': function() {
          var startDate = '2012-11-30',
              endDate = '2012-11-36';

          var dr = new DateRange(startDate, endDate);
          assert.equals(dr.validate().passed, false);
      },
      'should check first date precedes second date': function() {
          var startDate = '2012-12-30',
              endDate   = '2012-11-15';

          var dr = new DateRange(startDate, endDate);
          assert.equals(dr.validate().passed, false);
      },
      'should export a valid date range string': function() {
        var startDate = '2012-11-30',
            endDate   = '2012-12-27',
            dr = new DateRange(startDate, endDate),
            expectedRange = '[2012-11-30T00:00:00.000Z TO ' +
                            '2012-12-27T00:00:00.000Z]';
            dr.validate();
        
            assert.equals(dr.toString(), expectedRange);
      },
      'should export a display date range string': function() {
        var startDate = '2012-11-30',
            endDate   = '2012-12-27',
            dr = new DateRange(startDate, endDate),
            expectedRange = '30 Nov, 2012 TO ' +
                            '27 Dec, 2012';
            dr.validate();
        
            assert.equals(dr.toDisplayString(), expectedRange);
      }
    });


});

