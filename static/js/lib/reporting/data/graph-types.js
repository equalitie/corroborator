/*global define*/
// Author: Cormac McGuire
// ### 
// 

define(
  ['backbone', 'i18n!lib/reporting/nls/dict'],
  function(Backbone, i18n) {
    'use strict';
    var actorGraphs, bulletinGraphs, incidentGraphs;

    console.log(i18n);
    actorGraphs = [
      {
        key: 'age_en_exact',
        type: 'bar',
        label: i18n.filters.age
      },
      {
        key: 'sex_en_exact',
        type: 'pie',
        label: i18n.filters.sex
      },
      {
        key: 'actor_searchable_current_exact',
        type: 'bar',
        label: i18n.filters.location
      },
      {
        key: 'role',
        type: 'pie',
        label: i18n.filters.role
      },
      {
        key: 'civilian_en_exact',
        type: 'pie',
        label: i18n.filters.civilian
      },
      {
        key: 'most_recent_status_actor_exact',
        type: 'pie',
        label: i18n.filters.status
      },
      {
        key: 'actors_in_time',
        type: 'trend',
        label: i18n.filters.actors_in_time
      },
    ];

    bulletinGraphs = [
      {
        key: 'most_recent_status_bulletin_exact',
        type: 'pie',
        label: i18n.filters.status
      },
      {
        key: 'bulletin_labels_exact',
        type: 'bar',
        label: i18n.filters.labels
      },
      {
        key: 'bulletin_sources_exact',
        type: 'bar',
        label: i18n.filters.sources
      },
      {
        key: 'bulletin_type',
        type: 'pie',
        label: i18n.filters.type
      },
      {
        key: 'bulletin_searchable_locations_exact',
        type: 'bar',
        label: i18n.filters.location
      },
      {
        key: 'bulletins_time',
        type: 'trend',
        label: i18n.filters.bulletins_in_time
      },
      {
        key: 'confidence_score_exact',
        type: 'pie',
        label: i18n.filters.score
      },
      {
        key: 'bulletin_number_sources',
        type: 'pie',
        label: i18n.filters.number_sources
      }
    ];

    incidentGraphs = [
      {
        key: 'most_recent_status_incident_exact',
        type: 'pie',
        label: i18n.filters.status
      },
      {
        key: 'incident_labels_exact',
        type: 'bar',
        label: i18n.filters.labels
      },
      {
        key: 'incident_crimes_exact',
        type: 'bar',
        label: i18n.filters.sources
      },
      {
        key: 'incident_searchable_locations_exact',
        type: 'pie',
        label: i18n.filters.location
      },
      {
        key: 'incidents_time',
        type: 'trend',
        label: i18n.filters.incidents_in_time
      },
      {
        key: 'confidence_score_exact',
        type: 'pie',
        label: i18n.filters.score
      }
    ];

    return {
      actorGraphs: actorGraphs,
      bulletinGraphs: bulletinGraphs,
      incidentGraphs: incidentGraphs
    };
  }
);
