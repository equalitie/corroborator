/*global define*/
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
        'click li .text': 'relateToEntity'
      },
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_actor',
          content: {
            relationship: $(evt.currentTarget).text(),
            model: this.model
          }
        });
      },
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = this.template({
          model: this.model.toJSON()
        });
        this.$el.append(html);
      }
    });

    return ActorResultView;
    
});
