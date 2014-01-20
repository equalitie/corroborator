/*global define*/
// Author: Cormac McGuire
// ### Backbone view that shows a trend chart
// 

define(
  [
    'backbone', 'd3', 'nv', 'moment'
  ],
  function(Backbone, d3, nv, moment) {
  'use strict';
    return Backbone.View.extend({
      el: '.graphs svg',
      initialize: function(options) {
        this.data = options.data;
        console.log(options.data.values);
        this.render();
      },
      createChart: function() {
        var self = this;
        nv.addGraph(function() {
          var chart = nv.models.lineChart();

          chart.xAxis
          .axisLabel('date')
          .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d));
          });

          chart.yAxis
          .axisLabel('Actors');
          //.tickFormat(d3.format(',r'));

          d3.select(self.el)
          .datum(self.data.values)
          .transition().duration(500)
          .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
        return this;
      },
      render: function() {
        this.createChart();
      }
    });
  }
);
