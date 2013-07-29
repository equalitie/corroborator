/*global define, buster, describe, before, it */
// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define(
  [
    'jquery', 'underscore',
    'lib/CRUD/views/actor-form',
    'lib/CRUD/views/bulletin-form',
    'lib/CRUD/views/incident-form',
    'lib/CRUD/views/form-manager',
    'lib/CRUD/views/form-mixins',
    'lib/streams'
  ],
  function($, _, ActorForm, BulletinForm, IncidentForm, FormManager, Mixins,
    Streams) {

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

      
      describe('Form field formatting', function() {
        var Formatter = Mixins.Formatter;
        it("should create an integer from a string with an integer in it", function() {
          var intString = '1',
              intOut = 1,
              justAString = '56 somewhere st',
              actualIntOut = Formatter.makeIntStringsIntegers(intString),
              actualStringOut = Formatter.makeIntStringsIntegers(justAString);
          assert.equals(actualIntOut, intOut);
          assert.equals(actualStringOut, justAString);
        });

        it("should convert from jquery's serializeArray format to BB model format",
          function() {

          var jqueryStyle = [
                {"name":"foo","value":"1"},
                {"name":"foo","value":"3"},
                {"name":"bar","value":"xxx"},
                {"name":"this","value":"hi"}
              ],
              requiredStyle = {
                "foo" : [1,3],
                "bar" : "xxx",
                "this": "hi"
              },
              output;

          output = Formatter.formArrayToData(jqueryStyle);
          assert.equals(_.isEqual(output, requiredStyle), true);
          assert.equals(output, requiredStyle);

        });
      });
    });
    

});
