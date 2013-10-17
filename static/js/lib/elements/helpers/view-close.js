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

    var showFirstElementWithContent = function(el) {
        var i18nValues = $(el).children('[lang]');
        var hasContent = _.find(i18nValues, function(langEl) {
          return $(langEl).text().length > 0;
        });
        $(hasContent).show().siblings('[lang]').hide();
    };

    Backbone.View.prototype.addi18n = function() {
      this.events = this.events || {};

      // this can be called on the view to manually switch language
      var switchLanguage = function(evt) {
        var clickedElement = evt.currentTarget,
            i18nElement = $(evt.currentTarget).parent()
                                              .parent();
        Language.toggleLanguage(clickedElement, i18nElement);
      };

      // this can be called on the view to automatically select the language
      // that contains a value within i18nable elements. It should be called on
      // a view after it renders.
      var selectInitialLanguage = function() {
        console.log(this.el);
        var langElements = $('.' + this.el.className + ' .i18n');
        _.forEach(langElements, showFirstElementWithContent);
        return this;
      };

      this.selectInitialLanguage = selectInitialLanguage;
      this.switchLanguage = switchLanguage;
      _.extend(this.events, {'click .toggle span': 'switchLanguage'});
      this.delegateEvents();
    };

  });


