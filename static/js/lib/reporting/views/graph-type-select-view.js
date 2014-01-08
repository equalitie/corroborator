/*global Bootstrap*/
// Author: Cormac McGuire
// ### Handles the graph selector drop down menus
// 

define(
  [
    'backbone', 
    'lib/streams',
    'lib/reporting/data/graph-types',
    'lib/reporting/templates/graph-selector.tpl',
    'i18n!lib/reporting/nls/dict'
  ],
  function(Backbone, Streams, GraphTpyes, graphSelectorTpl, i18n) {
    'use strict';

    var graphTypes = {
          actor   : GraphTpyes.actorGraphs,
          incident: GraphTpyes.incidentGraphs,
          bulletin: GraphTpyes.bulletinGraphs,
          user    : GraphTpyes.userGraphs
        },
        filterRouteEvent = function(value) {
          return value.type === 'navigate';
        },
        mapRouteToGraphTypeCollection = function(value) {
          return graphTypes[value.content.route];
        },
        GraphSelectorView,
        UserGraphSelectorView,
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
        Streams.navBus.filter(filterRouteEvent)
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

    // show and handle the graph selector drop down
    GraphSelectorView = Backbone.View.extend({
      template: graphSelectorTpl,
      events: {
        'change select#graph-type': 'graphSelected',
        'change select.user-select': 'userSelected'
      },
      initialize: function() {
        this.render();
      },

      onDestroy: function() {
        this.stopListening();
      },

      // user selected
      userSelected: function(evt) {
        var selectedUser = this.$el.children().children('select.user-select').val(),
            selectedKey = this.$el.children().children('select#graph-type').val(),
            model = this.collection.get(selectedKey);

        model.set('user_id', selectedUser);
        this.requestGraph(model);
      },

      // graph type selected
      graphSelected: function(evt) {
        var selectedKey = this.$el.children().children('select#graph-type').val(),
            model = this.collection.get(selectedKey);
        if (model.get('user_required') === true) {
          this.showUsers();
        }
        else {
          this.hideUsers();
          this.requestGraph(model);
        }
      },

      // push a graph event
      requestGraph: function(model) {
        Streams.searchBus.push({
          type: 'graph',
          content: model
        });
      },

      // hide user select 
      hideUsers: function() {
        this.$el.children().children('.user-select').addClass('hidden');
      },

      // show user select box for graphs that require a specific user
      showUsers: function() {
        this.$el.children().children('.user-select').removeClass('hidden');
      },

      render: function() {
        var key = this.collection.entity + '_by';
        var html = this.template({
          collection: this.collection.toJSON(),
          i18n: i18n,
          users: Bootstrap.user_list,
          by: i18n.filters[this.collection.entity + '_by']
        });
        this.$el.html(html);
      }
    });

    UserGraphSelectorView  = Backbone.View.extend({
    });

    return GraphSelectorManager;
  }
);
