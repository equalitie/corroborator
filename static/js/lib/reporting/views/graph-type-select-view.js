/*global define*/
// Author: Cormac McGuire
// ### 
// 

define(
  [
    'backbone', 
    'lib/reporting/streams',
    'lib/reporting/data/graph-types',
    'lib/reporting/templates/graph-selector.tpl',
    'i18n!lib/reporting/nls/dict'
  ],
  function(Backbone, EventStreams, GraphTpyes, graphSelectorTpl, i18n) {
    'use strict';

    var graphTypes = {
          actors: GraphTpyes.actorGraphs,
          incidents: GraphTpyes.incidentGraphs,
          bulletins: GraphTpyes.bulletinGraphs
        },
        filterRouteEvent = function(value) {
          return value.type === 'route';
        },
        mapRouteToGraphTypeCollection = function(value) {
          return new Backbone.Collection(graphTypes[value.content.route]);
        },
        GraphSelectorView,
        GraphSelectorManager;

    // Select the graph types that can be chosen from based
    // on events triggered by route changes
    GraphSelectorManager = Backbone.View.extend({
      el: '.graph-selector',
      initialize: function() {
        this.listenForNavigate();
      },

      // listen for routing events
      listenForNavigate: function() {
        EventStreams.filter(filterRouteEvent)
                    .map(mapRouteToGraphTypeCollection)
                    .onValue(this.updateGraphSelector.bind(this));
      },

      // change the currently displayed graph types
      updateGraphSelector: function(collection) {
        if (this.currentView) {
          this.currentView.destroy();
        }
        this.currentView = new GraphSelectorView({
          collection: collection
        });
        this.$el.append(this.currentView.$el);
      }
    });

    GraphSelectorView = Backbone.View.extend({
      template: graphSelectorTpl,
      events: {
      },
      initialize: function() {
        this.render();
      },
      onDestroy: function() {
        this.stopListening();
      },
      render: function() {
        var html = this.template({
          collection: this.collection.toJSON(),
          i18n: i18n
        });
        this.$el.html(html);
      }
    });

    return GraphSelectorManager;
  }
);
