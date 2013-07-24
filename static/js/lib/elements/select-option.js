/*global define*/
// Author: Cormac McGuire
// ### Description
// Select option for lists, used for multiple select options

define (
  [
    'backbone',
    'lib/elements/templates/select-option.tpl'
  ],
  function (Backbone, selectOptionTmp) {
    'use strict';
    var SelectOptionView;

    // ### SelectOptionView
    // render a single select option
    SelectOptionView = Backbone.View.extend({
      tagName: 'option',
      initialize: function() {
        this.model.on('destroy', this.destroy);
        this.render();
      },
      destroy: function() {
        this.$el.remove();
        this.model.off('destroy');
        this.undelegateEvents();
      },
      render: function() {
        this.$el.attr('value', this.model.get('id'));
        this.$el.attr('selected', true);
      }
    });

    return SelectOptionView;
    
});



