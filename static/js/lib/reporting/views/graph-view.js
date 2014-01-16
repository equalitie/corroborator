/*global define*/
// Author: Cormac McGuire
// ### Show the graphs selected by the user
// 

define(
  [
    'backbone', 
    'lib/streams',
    'lib/reporting/views/pie-view'
  ],
  function(Backbone, Streams, PieChartView, BarGraphView, TrendGraphView) {
  'use strict';
  var GraphViewManager,
      GraphView,
      filterGraphDisplayRequest = function(value) {
        return value.type === 'request_graph_display';
      };


  GraphViewManager = Backbone.View.extend({
    el: '#reporting-content .col.first',
    initialize: function(options) {
      this.listenForGraphRequests();
    },
    listenForGraphRequests: function() {
      Streams.searchBus.filter(filterGraphDisplayRequest)
                       .onValue(this.displayGraph.bind(this));
    },
    displayGraph: function(value) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.$el.children('.graphs').remove();
      this.$el.append('<div class="graphs"><svg></svg></div>');
      this.chart = new PieChartView({
        data: value.content
      });
      this.$el.append(this.chart.$el);
    }

  });



  var init = function() {
    var graphViewManager = new GraphViewManager();
  };


  
  return {
    init: init
  };


  
});
