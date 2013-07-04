/*global Bootstrap*/

// Author: Cormac McGuire  
// collections.js  
// Instantiate and store a reference to our collections
define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/Data/actor',
    'lib/Data/bulletin',
    'lib/Data/incident'
  ],
  function($, _, Backbone, Streams, Actor, Bulletin, Incident) {
    var actorCollection = new Actor.ActorCollection();
    var bulletinCollection = new Bulletin.BulletinCollection();
    var incidentCollection = new Incident.IncidentCollection();

  return {
    ActorCollection: actorCollection,
    BulletinCollection: bulletinCollection,
    IncidentCollection: incidentCollection
  };

});
