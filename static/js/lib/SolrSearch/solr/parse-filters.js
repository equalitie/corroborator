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
        actorFields = [
          'age_en_exact',
          'sex_en_exact',
          'civilian_en_exact',
          'nationality_en_exact'
        ],
        // bulletin fields
        bulletinFields = [
          'bulletin_labels_exact',
          'bulletin_assigned_exact',
          'most_recent_status_bulletin_exact',
          'sources_exact'
        ],
        // incident fields
        incidentFields = [
          'incident_labels_exact', 
          'incident_assigned_exact',
          'crimes_exact',
          'most_recent_status_incident_exact'
        ],
        // pull the bulletin filters from the returned list
        extractBulletinFilters = function(filters) {
          return _.pick(filters, bulletinFields);
        },
        // pull the incident filters from the returned list
        extractIncidentFields = function(filters) {
          return _.pick(filters, incidentFields);
        },
        // pull the actor filters from the returned list
        extractActorFilters = function(filters) {
          return _.pick(filters, actorFields);
        },
        // send the actor filters on to the search event bus
        sendActorFilters = function(actorFilters) {
          Streams.searchBus.push({
            type: eventIdentifier + '_actor',
            content: actorFilters
          });
        },
        // send the incident filters on to the search event bus
        sendIncidentFilters = function(incidentFilters) {
          Streams.searchBus.push({
            type: eventIdentifier + '_incident',
            content: incidentFilters
          });
        },

        // send the bulletin filters on to the search event bus
        sendBulletinFilters = function(bulletinFilters) {
          Streams.searchBus.push({
            type: eventIdentifier + '_bulletin',
            content: bulletinFilters
          });
        };

    // ### ParseFilter
    // main function  
    // filters the different filter types from the list
    // and then sends the events off on the search bus
    var ParseFilter = function (searchFields) {
      var actorFilters = extractActorFilters(searchFields),
          incidentFilters = extractIncidentFields(searchFields),
          bulletinFilters = extractBulletinFilters(searchFields);

      sendActorFilters(actorFilters);
      sendIncidentFilters(incidentFilters);
      sendBulletinFilters(bulletinFilters);
      
    };

    return ParseFilter;
});

