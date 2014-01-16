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
          Streams.searchBus.push({
            type: 'request_graph_display',
            content: response
          });
        },
        graphDataError = function(response) {
          console.log(arguments);
        },
        sendGraphingRequest = function(url) {
          console.log(url);
          $.ajax({
            url: url,
            success: graphDataReceived,
            error: graphDataError
          });
        },
        mapRequestToUrl = function(value) {
          var graphModel = userGraphs.get(value.content.key),
              urlTpl = graphModel.get('user_required') === true
                ? _.template(
                  '/corroborator/graphs/user/<%=graph_type %>/<%=user %>/')
                : _.template('/corroborator/graphs/user/<%=graph_type %>/');

          return urlTpl({
            graph_type: value.content.key,
            user: value.content.user_id
          });
        },
        startGraphListener = function() {
          Streams.searchBus.filter(userGraphFilter)
                           .map(mapRequestToUrl)
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
