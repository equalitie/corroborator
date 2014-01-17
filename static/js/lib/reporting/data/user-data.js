/*global define*/
// Author: Cormac McGuire
// ### Listen for user graph events send requests to django to generate the user graphs
// 

define(
  [
    'jquery', 'underscore',
    'lib/streams',
    'lib/reporting/data/graph-types'
  ],
  function($, _, Streams, GraphTypes) {
    'use strict';
    var userGraphs = GraphTypes.userGraphs,
        graphFilter = function(value) {
          return value.type === 'request_graph_data';
        },
        userGraphFilter = function(value) {
          return value.type === 'request_graph_data';
        },
        graphDataReceived = function(response) {
          response.key = this.key;
          Streams.searchBus.push({
            type: 'request_graph_display',
            content: response
          });
        },
        graphDataError = function(response) {
          console.log(arguments);
        },
        sendGraphingRequest = function(graphData) {
          $.ajax({
            url: graphData.url,
            success: graphDataReceived.bind(graphData),
            error: graphDataError
          });
        },
        mapRequestToUrlAndKey = function(value) {
          var graphModel = userGraphs.get(value.content.key),
              urlTpl = graphModel.get('user_required') === true
                ? _.template(
                  '/corroborator/graphs/user/<%=graph_key %>/<%=user %>/')
                : _.template('/corroborator/graphs/user/<%=graph_key %>/');

          return {
            url: urlTpl({
              graph_key: value.content.key,
              user: value.content.user_id
              }),
            key: value.content.key
          };
        },
        startGraphListener = function() {
          Streams.searchBus.filter(userGraphFilter)
                           .map(mapRequestToUrlAndKey)
                           .onValue(sendGraphingRequest);
        },
        init = function() {
          startGraphListener();
        };
  
    return {
      init: init
    };

  }
);
