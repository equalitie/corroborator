/*global define */
/**
### combo
represent a combo box 
reacts to the being pressed - sends the model that has been pressed in the event

collection contains the elements to be displayed

When creating an instance of the view, you can either pass in the element to watch
or have one rendered.



you may also pass a custom event dispatcher which will be used instead of the 
global dispatcher for sending events

TODO: define template for the view
*/
define(
  [
    // vendor
    'jquery', 'underscore', 'backbone', 'handlebars',
    // local libs
    'lib/dispatcher',
    // templates
    'lib/elements/templates/combo-outer.tpl',
    'lib/elements/templates/combo-inner.tpl'
  ],
  function ($, _, Backbone, Handlebars, dispatcher, co, ci) {
    // ##
    var collection = Backbone.Collection.extend();


    // ### Combo view
    var view = Backbone.View.extend({
      events: {
        'click .combo-main': 'mainSearch',
      },

      initialize: function(options) {
        if (options.element) {
          this.setElement(options.element);
        }
        if (options.primary) {
          this.setPrimary(options.primary);
        }
        this.template = Handlebars.templates['combo-outer.tpl'];
      },

      setPrimary: function(primary) {
        this.primary = {
          search_request: primary.label
        };
      },

      mainSearch: function() {
        dispatcher.trigger('search_requested');
      },

      render: function() {
        var html = this.template(this.primary);
        this.$el.append(html);
      }
    });

    // expose our view as a module export
    return {
      view: view,
      collection: collection
    };
});

