/*global window, document, define */
'use strict';
define(
  ['backbone', 'marionette', 'lib/elements/input'],
  function(Backbone, Marionette, InputView) {
    var init = function() {
      var inputView = new InputView({
        element: '#search-bulletin',
      });
    };
    return {
      init: init
    };
  }
);
