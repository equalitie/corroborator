/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// Describe the actor role entity, used to relate actors to actors, bulletins
// and incidents and describe their role

define (
  [
    'backbone', 'underscore',
    'lib/streams'
  ],
  function (Backbone, _, Streams) {
    'use strict';
    var ActorRoleModel,
        ActorRoleCollection,
        ActorRelationshipModel,
        prepareForCollection,
        DjangoBaseModel,
        crudBus = Streams.crudBus,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        };



    // TODO refactor and reuse this across a bunch of models
    DjangoBaseModel = {
      idAttribute: 'id',
      initialize: function(options) {
        if (this.get('resource_uri')) {
          this.id = mapResourceUriToId(this.get('resource_uri'));
          this.loadModel();
        }
        if (typeof(this.onInitialize === 'function')) {
          this.onInitialize();
        }
      },

      // load model from the api
      loadModel: function() {
        if (this.get('autoFetch') !== false) {
          this.fetch();
        }
      },

      // set the url for api calls
      url: function() {
        var base = '/api/v1/'+ this.resourceName + '/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    };

    var fieldNameMap = {
      role_status: Bootstrap.gl_ac_role_list,
      relation_status: Bootstrap.gl_ac_relation_list
    };
    var getRoleFromKey = function(key, fieldName) {
      var roleList = fieldNameMap[fieldName],
          i = 0, result;
      while (result === undefined) {
        if (roleList[i].key === key) {
          result = roleList[i].value;
        }
      }
      return result;
    };

    // Convert from three array format to single array
    // that can be used to init the actor role collection.
    // Array should be in the following format with all arrays of
    // equal length
    // {
    //   roles: []
    //   actors: []
    //   actors_role: []
    // }
    prepareForCollection = function(actorRoleArray) {
      var i, formattedArray = [];
      for (i=0; i < actorRoleArray.roles.length; i++) {
        var actorRole = {
          actor:        actorRoleArray.actors[i],
          role_status:  actorRoleArray.roles[i],
          resource_uri: actorRoleArray.actors_role[i],
          autoFetch:    false
        };
        formattedArray.push(actorRole);
      }
      return formattedArray;
    };



    // ### ActorRoleModel
    // represent the ActorRole model
    ActorRoleModel = Backbone.Model.extend({
      resourceName: 'actorRole',
      onInitialize: function() {
        console.log(this.toJSON());
      },
      setRelationType: function(fieldName) {
        var setFunction = fieldName === 'role_status' ?
          this.setAsRole : this.setAsRelation;
        console.log('setRelationType: ', fieldName);
        setFunction();
      },
      setAsRelation: function() {
        this.set('role_en', getRoleFromKey('role_status'));
        console.log('setAsRelation');
      },
      setAsRole: function() {
        this.set('role_en', getRoleFromKey('role_status'));
        console.log('setAsRole');
      }

    });
    _.extend(ActorRoleModel.prototype, DjangoBaseModel);

    // ###Collection
    // 
    ActorRoleCollection = Backbone.Collection.extend({
      model: ActorRoleModel
    });

    return {
      prepareForCollection: prepareForCollection,
      ActorRoleCollection: ActorRoleCollection,
      ActorRoleModel: ActorRoleModel
    };

});
