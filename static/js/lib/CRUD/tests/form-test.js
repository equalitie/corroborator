/*global define, buster, describe, before, it */
// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define(
  [
    'jquery',
    'lib/CRUD/views/actor-form',
    'lib/CRUD/views/bulletin-form',
    'lib/CRUD/views/incident-form',
    'lib/CRUD/views/form-manager',
    'lib/streams'
  ],
  function($, ActorForm, BulletinForm, IncidentForm, FormManager, Streams) {
    'use strict';
    var assert = buster.assert,
        manager;
    buster.spec.expose();
    var spec = describe('Test form display', function () {
      //var 
    
      before(function() {
        manager = new FormManager.FormManagerView();
      });
    
      it("should display the actor form when new actor pressed", function() {
        Streams.navBus.push('actor');
        Streams.searchBus.push({
          content: {},
          type: 'create_actor'
        });
        var actorFormEl = $('#actor_form');
        assert.equals(actorFormEl.length, 1);

      });
      it("should display the incident form when new incident pressed", function() {
        Streams.navBus.push('incident');
        Streams.searchBus.push({
          content: {},
          type: 'create_incident'
        });
        var incidentFormEl= $('#incident_form');
        assert.equals(incidentFormEl.length, 1);

      });
      it("should display the bulletin form when new bulletin pressed", function() {
        Streams.navBus.push('bulletin');
        Streams.searchBus.push({
          content: {},
          type: 'create_bulletin'
        });
        var bulletinFormEl = $('#bulletin_form');
        assert.equals(bulletinFormEl.length, 1);

      });
      
    });
    

});
