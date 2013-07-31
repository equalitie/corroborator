/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Describe the actor role entity, used to relate actors to bulletins and
// incidents and describe their role

define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';
    var ActorRoleModel,
        crudBus = Streams.crudBus;

    // ### ActorRoleModel
    // 
    ActorRoleModel = Backbone.Model.extend({
      idAttribute: 'resource_uri',
      initialize: function() {
      },
      url: function() {
        var base = '/api/v1/actorRole/';
        if (this.id) {
          base = this.id;
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    return {
      ActorRoleModel: ActorRoleModel
    };
    
});

