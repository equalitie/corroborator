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
    'lib/CRUD/views/search-views/actor/actor-search-field',
    // templates
    'lib/CRUD/templates/actor.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins, ActorSearchView, actorFormTmp) {

    var ActorFormView,
        crudBus      = Streams.crudBus,
        Formatter    = Mixins.Formatter,
        WidgetMixin  = Mixins.WidgetMixin;
        ConfirmMixin = Mixins.ConfirmMixin;

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      childViews: [],
      entityType: 'actor',
      events: {
        'click button#actor-action_save': 'saveRequested',
        'click button.do-hide': 'requestCloseForm'
      },

      // keys for date fields, these need to be validated and removed
      // from the model object if invalid
      dateFields: ['DOB'], 

      // ids of combo boxes
      comboIds: ['#sex_en', '#age_en', '#civilian_en'],

      // constructor
      initialize: function() {
        this.render();
      },

      // remove the dom elements and all associated events
      onDestroy: function() {
        this.destroyChildViews();
      },
      
      // destroy the sub views
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // render the form
      render: function() {
        var html = actorFormTmp();
        this.$el.empty()
                .append(html);
      },


      // pull the data from the form
      formContent: function() {
        var formArray = $('#actor_form').serializeArray();
        return this.formArrayToData(formArray);
      },

      // we need to remove DOB from the object if they do not have
      // valid dates - test it baby
      validateDateFields: function(formContent) {
        return _.omit(formContent, this.dateFields);
      },

      // send the form data on the crudBus, it will be picked up in data and 
      // persisted
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
      },
      // render the sub views
      renderChildren: function() {
        var actorSearchView = new ActorSearchView({
          el: '#actor-actor-search-block',
          entityType: 'actor'
        });
        this.childViews.push(actorSearchView);
      }

    });
    _.extend(ActorFormView.prototype, ConfirmMixin);
    _.extend(ActorFormView.prototype, WidgetMixin);
    _.extend(ActorFormView.prototype, Formatter);
    
    return {
      ActorFormView: ActorFormView
    };

});
