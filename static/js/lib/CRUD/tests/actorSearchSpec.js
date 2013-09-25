/*global runs, waitsFor, jasmine, describe, beforeEach, afterEach, xit, it, expect */
// Author: Cormac McGuire
// ### Description
// test the creation and association of actor roles to entities

define(
  [
    'jquery', 'underscore',
    'lib/CRUD/data/ActorRoleCollection',
    'lib/CRUD/views/search-views/actor/actor-search-field',
    'lib/CRUD/tests/fixtures'
  ],
  function ($, _, ActorRole, ActorSearchField, fixtures) {
  'use strict';
  describe('test actor role creation and association', function() {
    var incidents, actorRoleCollection;

    // ## helper functions
    var getActorRoleArrays = function(incident) {
      return {
        roles: incident.actor_roles_status,
        actors: incident.actors,
        actors_role: incident.actors_role
      };
    };

    beforeEach(function() {
      incidents = fixtures.incidents;
      var actorRoleArrays = getActorRoleArrays(_.first(incidents));
      var preparedArrays =
        ActorRole.prepareForCollection(actorRoleArrays);
      actorRoleCollection =
        new ActorRole.ActorRoleCollection(preparedArrays);
    });

    afterEach(function() {
    });

    it('should create roles collection from the solr actor fields',
    function(){
      expect(actorRoleCollection.length).toEqual(2);
    });
    it('should load the correct rolename from the key', function(){
      expect(actorRoleCollection.first().get('role_en')).toEqual('Killed');
    });

  });
});
