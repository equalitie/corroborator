/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// display an embedded search result for an actor

define (
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/CRUD/templates/actor-result.tpl',
  ],
  function ($, Backbone, Streams, actorResultTmp) {
    'use strict';

    var ActorResultView,
        crudBus = Streams.crudBus;

    // ### ActorResultView
    // 
    ActorResultView = Backbone.View.extend({
      template: actorResultTmp,
      tagName: 'li',
      events: {
        'click .actions.search-result li .text': 'relateToEntity',
        'click .when-related li .text': 'updateRelationship',
        'click .do-removeActor': 'removeActor'
      },
      // constructor
      initialize: function(options) {
        if (options.type === undefined) {
          throw "You must specify a type";
        }
        if (options.actorRoleModel) {
          this.actorRoleModel = options.actorRoleModel;
        }
        this.type = options.type;
        this.render();
      },
      // send a message asking to relate this actor to the current  
      // entity being edited
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_actor_request',
          content: {
            relationship: $(evt.currentTarget).text(),
            model: this.model
          }
        });
      },

      // update the role of this actor
      updateRelationship: function(evt) {
        evt.preventDefault();
        crudBus.push({
          type: 'update_actor_relationship_request',
          content: {
            relationship: $(evt.currentTarget).text(),
            model: this.actorRoleModel
          }
        });
      },

      // remove the actor from the current entity
      removeActor: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        if (this.actorRoleModel !== undefined) {
          this.actorRoleModel.destroy();
        }
        crudBus.push({
          type: 'unrelate_actor_request',
          content: {
            model: this.model
          }
        });
      },

      // unsubscribe from dom events and remove the element
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      resetFlags: function() {
        this.model.unset('selected');
        this.model.unset('result');
      },

      // render the template
      render: function() {
        this.resetFlags();
        this.model.set(this.type, true);
        var templateVars = {
          model: this.model.toJSON(),
          roles: Bootstrap.gl_ac_role_list
        };
        if (this.actorRoleModel !== undefined) {
          templateVars.roleModel = this.actorRoleModel.toJSON();
        }
        var html = this.template(templateVars);
        this.$el.append(html);
      }
    });

    return ActorResultView;
    
});