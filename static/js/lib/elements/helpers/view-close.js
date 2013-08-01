/*global define*/
// Author: Cormac McGuire
// ### Description
// What the file is for

define (
  [
    'backbone'
  ],
  function (Backbone) {
    'use strict';

    Backbone.View.prototype.destroy = function() {
      this.$el.removeData().unbind();
      this.remove();
      this.undelegateEvents();
      if (this.onDestroy) {
        this.onDestroy();
      }
    };
});



