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
        searchBus    = Streams.searchBus,
        crudBus      = Streams.crudBus,
        Formatter    = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin;

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      events: {
        'click button#actor-action_save': 'saveRequested',
        'click button.do-hide': 'requestCloseForm'
      },
      // keys for date fields, these need to be validated and removed
      // from the model object if invalid
      dateFields: ['DOB', 'POB'], 
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

      // we need to remove DOB and POB from the object if they do not have
      // valid dates - test it baby
      validateDateFields: function(formContent) {
        return _.omit(formContent, this.dateFields);
      },

      saveRequested: function() {
        var formContent = this.formContent();
        formContent = this.validateDateFields(formContent);

        if (this.model !== undefined) {
          this.model.save();
        }
        else {
          crudBus.push({
            type: 'create_new_actor',
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
