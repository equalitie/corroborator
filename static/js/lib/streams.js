/*global window, document, define */
/* simple event dispatcher module
 * used to pass messages around our app
 */
define(
  ['bacon'],
  function(Bacon) {
    'use strict';
    var searchBus = new Bacon.Bus();
    searchBus.toEventStream().log();
    var navBus = new Bacon.Bus();
    navBus.toEventStream().log();
    return {
      searchBus: searchBus,
      navBus: navBus
    };
  }
);


