/*global define */
// Author: Cormac McGuire
// ## parse-filters.js
// Parse the filters from the result of the ajax search  

define(
  [
    'underscore', 
    'lib/streams'
  ],
  function(_, Streams) {

    var eventIdentifier = 'parse_filters',
        // ### Solr facet fields
        // These are used to filter out the different filters from the object
        // returned by solr  
        // actor fields
        fields = {
          actor: [
            'age_en_exact',
            'age_ar_exact',
            'sex_en_exact',
            'sex_ar_exact',
            'civilian_en_exact',
            'civilian_ar_exact',
            'nationality_en_exact',
            'nationality_ar_exact',
            'occupation_en_exact',
            'occupation_ar_exact',
            'position_en_exact',
            'position_ar_exact',
            'ethnicity_en_exact',
            'ethnicity_ar_exact',
            'spoken_dialect_en',
            'spoken_dialect_ar',
            'current_location_exact',
            'POB_exact'
            //'actor_created_exact',
            //'dob_exact',
          ],
          // bulletin fields
          bulletin: [
            'bulletin_labels_exact',
            'bulletin_assigned_user_exact',
            'most_recent_status_bulletin_exact',
            'bulletin_sources_exact',
            'bulletin_locations_exact'
          ],
          // incident fields
          incident: [
            'incident_labels_exact', 
            'incident_assigned_user_exact',
            'incident_crimes_exact',
            'most_recent_status_incident_exact',
            'incident_locations_exact
          ]
        },
        // pull the bulletin filters from the returned list
        extractFilters = function(filters, entity) {
          return _.pick(filters, fields[entity]);
        },
        // send the actor filters on to the search event bus
        sendFilters = function(filters, entity) {
          Streams.searchBus.push({
            type: eventIdentifier + '_' + entity,
            content: filters
          });
        };

    // ### ParseFilter
    // main function  
    // filters the different filter types from the list
    // and then sends the events off on the search bus
    var ParseFilter = function (searchFields, entity) {
      var filters = extractFilters(searchFields, entity);
      sendFilters(filters, entity);
    };

    return ParseFilter;
});

