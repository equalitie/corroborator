/*global define*/
// Author: Cormac McGuire
// ### 
// 

define(
  ['backbone', 'i18n!lib/reporting/nls/dict'],
  function(Backbone, i18n) {
    'use strict';

    var GraphModel = Backbone.Model.extend({
          idAttribute: 'key'
        }),
        GraphTypeCollection = Backbone.Collection.extend({
          model: GraphModel
        }),

        userGraphs, actorGraphs, bulletinGraphs, incidentGraphs;


    actorGraphs = new GraphTypeCollection([
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
    ]);
    actorGraphs.each(function(aGraph) {
      aGraph.set('entity', 'actor');
    });

    bulletinGraphs = new GraphTypeCollection([
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
    ]);

    bulletinGraphs.each(function(bGraph) {
      bGraph.set('entity', 'bulletin');
    });

    incidentGraphs = new GraphTypeCollection([
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
    ]);

    incidentGraphs.each(function(iGraph) {
      iGraph.set('entity', 'incident');
    });

    userGraphs = new GraphTypeCollection([
      {
        key: 'user_login_time',
        type: 'pie',
        label: i18n.filters.user_login_time,
      },
      {
        key: 'user_login_per_day',
        type: 'trend',
        label: i18n.filters.user_login_per_day,
        user_required: true
      },
      {
        key: 'user_average_updates',
        type: 'pie',
        label: i18n.filters.user_average_updates
      },
      {
        key: 'user_assigned_items_by_status',
        type: 'pie',
        label: i18n.filters.user_assigned_items_by_status,
        user_required: true
      },
      {
        key: 'user_deleted_items',
        type: 'pie',
        label: i18n.filters.user_deleted_items
      },
      {
        key: 'user_created_items',
        type: 'pie',
        label: i18n.filters.user_created_items
      },
      {
        key: 'user_edited_items',
        type: 'pie',
        label: i18n.filters.user_edited_items
      },
      {
        key: 'user_deleted_edited_created',
        type: 'trend',
        label: i18n.filters.user_deleted_edited_created,
        user_required: true
      }
    ]);
    userGraphs.each(function(uGraph) {
      uGraph.set('entity', 'user');
    });

    userGraphs.entity = 'users';
    actorGraphs.entity = 'actors';
    bulletinGraphs.entity = 'bulletins';
    incidentGraphs.entity = 'incidents';

    var allGraphs = new Backbone.Collection(userGraphs.toJSON());
    allGraphs.add(actorGraphs.toJSON());
    allGraphs.add(bulletinGraphs.toJSON());
    allGraphs.add(incidentGraphs.toJSON());
    console.log(allGraphs);

    return {
      userGraphs    : userGraphs,
      actorGraphs   : actorGraphs,
      bulletinGraphs: bulletinGraphs,
      incidentGraphs: incidentGraphs,
      allGraphs     : allGraphs
    };
  }
);
