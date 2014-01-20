/*global define*/
// Author: Cormac McGuire
// ### Backbone view that shows a pie chart
// 

define(
  [
    'backbone', 'd3', 'nv'
  ],
  function(Backbone, d3, nv) {
  'use strict';
    return Backbone.View.extend({
      el: '.graphs svg',
      initialize: function(options) {
        this.data = options.data;
        this.render();
      },
      createChart: function() {
        this.chart = nv.models.pieChart()
            .x(function(d) { return d.label; })
            .y(function(d) { return d.value; })
            .showLabels(true);
        return this;
      },
      bindChartToEl: function() {
        d3.select(this.el)
          .datum(this.data.values)
          .transition().duration(1200)
          .call(this.chart);
        return this;
      },
      render: function() {
        this.createChart()
            .bindChartToEl();
        nv.addGraph(this.chart);
      }
    });
  }
);
