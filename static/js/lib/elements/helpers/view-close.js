/*global define*/
// Author: Cormac McGuire
// ### Description
// What the file is for

define (
  [
    'backbone', 'underscore', 'jquery',
    'lib/elements/language'
  ],
  function (Backbone, _, $, Language) {
    'use strict';

    Backbone.View.prototype.destroy = function() {
      this.$el.removeData().unbind();
      this.remove();
      this.undelegateEvents();
      if (this.onDestroy) {
        this.onDestroy();
      }
    };

    Backbone.View.prototype.addi18n = function() {
      this.events = this.events || {};
      _.extend(this.events, {'click .toggle span': 'switchLanguage'});
      this.switchLanguage = function(evt) {
        console.log('switchLanguage');
        var clickedElement = evt.currentTarget,
            i18nElement = $(evt.currentTarget).parent()
                                              .parent();
        Language.toggleLanguage(clickedElement, i18nElement);
      };
      this.delegateEvents();
    };
  });



