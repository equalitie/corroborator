/*global window, document, define */
'use strict';
define(
  [
    'backbone', 'marionette',
    'lib/elements/input',
    'lib/elements/combo'
  ],
  function(Backbone, Marionette, InputView, Combo) {
    var init = function() {
      var inputView = new InputView({
        el: '.search',
      });
      var Comboview = new Combo.view({
        element: '.search-combo',
        primary: {
          label: 'Search',
        }
      });
      Comboview.render();
    };
    return {
      init: init
    };
  }
);
