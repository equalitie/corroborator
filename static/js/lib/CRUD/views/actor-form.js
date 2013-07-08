// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    // templates
    'lib/CRUD/templates/actor.tpl'
  ],
  function ($, _, Backbone, Streams, actorFormTmp) {

    var ActorFormView;

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = actorFormTmp();
        this.$el.empty()
                .append(html);
      }
    });
    
    return {
      ActorFormView: ActorFormView
    };

});
