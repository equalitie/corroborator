// Author: Cormac McGuire

// ### Description
// Handle create update of bulletin(s)
// 

define (
  [
    'jquery', 'underscore', 'backbone', 
    'lib/streams',
    // templates
    'lib/CRUD/templates/bulletin.tpl'
  ],
  function ($, _, Backbone, Streams, bulletinFormTmp) {

    var BulletinFormView;

    // ### BulletinFormView
    // display create/update form for bulletins
    BulletinFormView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = bulletinFormTmp();
        this.$el.empty()
                .append(html);
      }
    });

    return {
      BulletinFormView: BulletinFormView
    };
    
});
