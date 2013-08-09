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
        ActorRelationshipModel,
        DjangoBaseModel,
        crudBus = Streams.crudBus,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        };

    // TODO refactor and reuse this across a bunch of models
    DjangoBaseModel = Backbone.Model.extend({
      idAttribute: 'id',
      initialize: function(options) {
        if (this.get('resource_uri')) {
          this.id = mapResourceUriToId(this.get('resource_uri'));
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/'+ this.resourceName + '/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    // ### ActorRoleModel
    // represent the ActorRole model
    ActorRoleModel = DjangoBaseModel.extend({
      resourceName: 'actorRole'
    });

    ActorRelationshipModel = DjangoBaseModel.extend({
      resourceName: 'actorRelationship'
    });

    return {
      ActorRoleModel: ActorRoleModel,
      ActorRelationshipModel: ActorRelationshipModel
    };

    
});

