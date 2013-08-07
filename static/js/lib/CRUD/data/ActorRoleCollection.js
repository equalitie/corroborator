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
        crudBus = Streams.crudBus,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        };

    // ### ActorRoleModel
    // 
    ActorRoleModel = Backbone.Model.extend({
      idAttribute: 'id',
      initialize: function(options) {
        if (this.get('resource_uri')) {
          this.id = mapResourceUriToId(this.get('resource_uri'));
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/actorRole/';
        if (this.id) {
          base = base + this.id + '/';
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

