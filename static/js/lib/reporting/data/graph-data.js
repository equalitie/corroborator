/*global define*/
// Author: Cormac McGuire
// ### Listen for user graph events send requests to django to generate the user graphs
// 

define(
  [
    'jquery', 'underscore', 'moment',
    'lib/streams',
    'lib/reporting/data/graph-types'
  ],
  function($, _, moment, Streams, GraphTypes) {
    'use strict';
    var userGraphs = GraphTypes.userGraphs,
        selectGraphTypeFromKey = GraphTypes.selectGraphTypeFromKey,
        graphFilter = function(value) {
          return value.type === 'parse_graph_data';
        },

        pieBarMapping = function(rawSolrData) {
          return {
            values: (function() {
              return _(rawSolrData).reduce(function(prevVal, item, key){
                return prevVal.concat({
                  label: key,
                  value: item
                });
              }, []);
            }())
          };
        },

        // return an object with format like:
        // lib/reporting/test/test-data: trendData
        // this is kind of gross and only maps for one trend line
        trendMapping = function(rawSolrData) { 
          if (_(rawSolrData).isObject()) {
            rawSolrData = [rawSolrData];
          }
          var returnObject = {},
              singleEntityValues = function(valueList) {
                 return {
                   key: 'key',
                   values: _(valueList).reduce(function(values, item, key) {
                     key = parseInt(moment(key).unix(), 10) * 1000;
                     return values.concat(
                       [{x:key, y:item}]
                     );
                   }, [])
                 };
              };
           
          returnObject.values = rawSolrData.map(singleEntityValues);
          return returnObject;
          
        },


        graphTypeMap = {
          'bar': pieBarMapping,
          'pie': pieBarMapping,
          'trend': trendMapping
        },

        mapToParsedJsonData = function(value) {
          var type = selectGraphTypeFromKey(value.key),
              parsedData = graphTypeMap[type](value.content);
          parsedData.key = value.key;
          return parsedData;
        },
        sendGraphingRequest = function(value) {
          Streams.searchBus.push({
            type: 'request_graph_display',
            content: value
          });
        },
        startGraphListener = function() {
          Streams.searchBus.filter(graphFilter)
                           .map(mapToParsedJsonData)
                           .onValue(sendGraphingRequest);
        },
        init = function() {
          startGraphListener();
        };
  
    return {
      init: init,
      pieBarMapping: pieBarMapping,
      trendMapping: trendMapping,
      mapToParsedJsonData: mapToParsedJsonData
    };

  }
);
