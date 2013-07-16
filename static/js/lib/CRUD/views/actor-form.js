// Author: Cormac McGuire
// file: 

// ### Description
// Handle create update of actor(s)
// 
define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    'lib/CRUD/views/form-mixins',
    // templates
    'lib/CRUD/templates/actor.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins, actorFormTmp) {

    var ActorFormView,
        searchBus = Streams.searchBus,
        Formatter = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin;

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      events: {
        'click button#actor-action_save': 'saveRequested',
        'click button.do-hide': 'requestCloseForm'
      },
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
      },
      formContent: function() {
        var formArray = $('#actor_form').serializeArray();
        return this.formArrayToData(formArray);
      },
      saveRequested: function() {
        var formContent = this.formContent();
        if (this.model !== undefined) {
          this.model.save();
        }
        else {
          searchBus.push({
            type: 'new_actor',
            content: formContent
          });
        }
      }
    });
    _.extend(ActorFormView.prototype, ConfirmMixin);
    _.extend(ActorFormView.prototype, Formatter);
    
    return {
      ActorFormView: ActorFormView
    };

});
