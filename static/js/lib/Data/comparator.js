/*global define*/
// Author: Cormac McGuire
// ### Description
// Define the sort functionality for our collections

define (
  [
    'underscore'
  ],
  function (_) {
    'use strict';
    var parseComparator, reduceArray, lowerCase;

    // parse the compare field
    parseComparator = function(compareField) {
      compareField = reduceArray(compareField);
      compareField = lowerCase(compareField);
      return compareField;
    };

    // pick the first element from the array for comparison
    reduceArray = function(field) {
      if (typeof(field) === 'object') {
        field = reduceArray(_.first(field));
      }
      return field;
    };

    // convert all strings to lower case for comparison
    lowerCase = function(field) {
      if (typeof(field) === 'string') {
        field = field.toLowerCase();
      }
      return field;
    };

  return {
    parseComparator: parseComparator
  };

});

