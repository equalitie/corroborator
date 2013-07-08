// Author: Cormac McGuire

// ### Description
// Handle create update of incident(s)
// 

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    // templates
    'lib/CRUD/templates/incident.tpl'
  ],
  function ($, _, Backbone, Streams, incidentFormTmp) {

    var IncidentFormView;

    // ### IncidentFormView
    // display create/update form for incidents
    IncidentFormView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = incidentFormTmp();
        this.$el.empty()
                .append(html);
      }
    });

    return {
      IncidentFormView: IncidentFormView
    };
    
});
