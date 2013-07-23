// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    // templates
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/templates/incident.tpl'
  ],
  function ($, _, Backbone, Streams, Mixins, incidentFormTmp) {

    var IncidentFormView,
        Formatter    = Mixins.Formatter,
        ConfirmMixin = Mixins.ConfirmMixin;

    // ### IncidentFormView
    // display create/update form for incidents
    IncidentFormView = Backbone.View.extend({
      events: {
        'click button#incident-action_save': 'saveRequested',
        'click button.do-hide': 'requestCloseForm'
      },
      initialize: function() {
        this.render();
      },
      enableWidgets: function() {
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = incidentFormTmp();
        this.$el.empty()
                .append(html);
      },
      // pull the data from the form
      formContent: function() {
        var formArray = $('#incident_form').serializeArray();
        return this.formArrayToData(formArray);
      },
      saveRequested: function() {
        var formContent = this.formContent();
        console.log(formContent);
      }
    });
    _.extend(IncidentFormView.prototype, ConfirmMixin);
    _.extend(IncidentFormView.prototype, Formatter);

    return {
      IncidentFormView: IncidentFormView
    };
    
});
