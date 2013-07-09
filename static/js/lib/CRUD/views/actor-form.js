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
    'lib/CRUD/templates/actor.tpl',
    'lib/CRUD/templates/confirm-dialog.tpl'
  ],
  function ($, _, Backbone, Streams, actorFormTmp, confirmDialogTmp) {

    var ActorFormView;

    // ### ActorFormView
    // display create update form for actor
    ActorFormView = Backbone.View.extend({
      events: {
        'click button.do-hide': 'requestCloseForm'
      },
      initialize: function() {
        this.render();
      },
      // dispatch and event that will be picked up and converted into a
      // dialog confirming that you want to exit the add/update
      requestCloseForm: function() {
        var dialogHTML = $(confirmDialogTmp());
        dialogHTML.dialog({
          resizable: false,
          height: 140,
          modal: true,
          buttons: {
            'Close Form': function() {
              Streams.searchBus.push({
                content: {},
                type: 'close_form'
              });
              $(this).dialog('close');
            },
            'Cancel': function() {
              $(this).dialog('close');
            }
          }
        });

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
