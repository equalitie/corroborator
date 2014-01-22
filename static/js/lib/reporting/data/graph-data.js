/*global define*/
// Author: Cormac McGuire
// ### Listen for user graph events send requests to django to generate the user graphs
// 

define(
  [
    'jquery', 'underscore', 'moment',
    'lib/streams',
    'lib/Data/LocationCollection',
    'lib/reporting/data/graph-types'
  ],
  function($, _, moment, Streams, LocationCollection, GraphTypes) {
    'use strict';
    var userGraphs = GraphTypes.userGraphs,
        locationCollection = new LocationCollection.LocationCollection(),
        selectGraphTypeFromKey = GraphTypes.selectGraphTypeFromKey,
        graphFilter = function(value) {
          return value.type === 'parse_graph_data';
        },

        locationMapper = function(key, locationUri) {
          return locationCollection.chain().filter(function(locModel) {
            return locModel.get('resource_uri') === locationUri;
          }).first().value().get('name_en');
        },

        mapKeyToLabel = function(key, label) {
          var labelFunctionMap = {
            actor_searchable_current_exact: locationMapper,
            bulletin_searchable_locations_exact: locationMapper,
            incident_searchable_locations_exact: locationMapper
          };
          if ( _(labelFunctionMap).chain().keys().contains(key).value() ) {
            label = labelFunctionMap[key](key, label);
          }
          return label;
        },


        pieBarMapping = function(rawSolrData, key) {
          return {
            values: (function() {
              return _(rawSolrData).reduce(function(prevVal, item, label){
                return prevVal.concat({
                  label: mapKeyToLabel(key, label),
                  value: item
                });
              }, []);
            }())
          };
        },

        

        // return an object with format like:
        // lib/reporting/test/test-data: trendData
        // this is kind of gross and only maps for one trend line
        trendMapping = function(rawSolrData, key) { 
          if (_(rawSolrData).isObject()) {
            rawSolrData = [rawSolrData];
          }
          var returnObject = {},
              singleEntityValues = function(valueList) {
                 return {
                   key: mapKeyToLabel(key),
                   values: _(valueList).reduce(function(values, item, label) {
                     label = parseInt(moment(label).unix(), 10) * 1000;
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
              parsedData = graphTypeMap[type](value.content, value.key);
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
