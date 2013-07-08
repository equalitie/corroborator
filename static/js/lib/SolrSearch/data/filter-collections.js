/*global define */
// Author: Cormac McGuire
// Aggregation of the filter collections
// if you're looking for some filters, you're in the right place

define(
  [
    'underscore',
    'lib/SolrSearch/data/actor-filter-collection',
    'lib/SolrSearch/data/incident-filter-collection',
    'lib/SolrSearch/data/bulletin-filter-collection',
  ],
  function (_, ActorFilterCollection, IncidentFilterCollection, 
    BulletinFilterCollection) {
    'use strict';
    // instantiate our filter collections
    var actorFilterCollection = new ActorFilterCollection();
    var bulletinFilterCollection = new BulletinFilterCollection();
    var incidentFilterCollection = new IncidentFilterCollection();

    // return the references to the collection instances
    return {
      ActorFilterCollection: actorFilterCollection,
      BulletinFilterCollection: bulletinFilterCollection,
      IncidentFilterCollection: incidentFilterCollection
    };

});

