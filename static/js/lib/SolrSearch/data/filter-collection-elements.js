/*global define*/
// Author: Cormac McGuire
// ### Description
// This defines a SelectedFilterCollection and a Filter Group collection that
// can be re-used across all your filter collections to model groups of 
// filters within each data type and to manage filters selected by each user


define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';

    var SelectedFilterCollection,
        FilterGroupCollection,
        filterRemoveFilterEvents = function(value) {
          return value.type === 'remove_filter';
        },
        searchBus = Streams.searchBus;

    // ### FilterGroupCollection
    // 
    FilterGroupCollection = Backbone.Collection.extend({
      initialize: function() {
        this.watchSearchStream();
      },
      watchSearchStream: function() {
        var self = this;
        searchBus.filter(filterRemoveFilterEvents)
                 .filter(function(value) {
                   return value.content.get('key') === self.groupKey;
                 })
                 .onValue(function(value) {
                   self.add(value.content);
                   console.log(value);
                 });
      },
    });

    // ### SelectedFilterCollection
    // 
    SelectedFilterCollection = Backbone.Collection.extend({
      initialize: function() {
      }
    });

    
    
    return {
      SelectedFilterCollection: SelectedFilterCollection,
      FilterGroupCollection   : FilterGroupCollection };
});

