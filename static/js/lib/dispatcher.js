/*global window, document, define */
'use strict';
(function(window, document, undefined) {
  define(
    ['jquery', 'backbone', 'underscore'],
    function($, Backbone, _) {
    var dispatcher = {};
    _.extend(dispatcher, Backbone.Events);
    return dispatcher;

  });
}(window, document));

