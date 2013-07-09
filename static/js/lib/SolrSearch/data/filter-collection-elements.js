/*global define*/
// Author: Cormac McGuire
// ### Description
// This defines a SelectedFilterCollection and a Filter Group collection that
// can be re-used across all your filter collections to model groups of 
// filters within each data type and to manage filters selected by each user


define (
  [
    'backbone', 'underscore'
  ],
  function (Backbone, _) {
    'use strict';

    var SelectedFilterCollection,
        FilterGroupCollection;

    // ### FilterGroupCollection
    // 
    FilterGroupCollection = Backbone.Collection.extend({
      initialize: function() {
      }
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

