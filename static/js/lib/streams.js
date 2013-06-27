/*global window, document, define */
/* simple event dispatcher module
 * used to pass messages around our app
 */
define(
  ['bacon'],
  function(Bacon) {
    'use strict';
    var searchBus = new Bacon.Bus(),
        navBus = new Bacon.Bus(),
        navProperty = navBus.toProperty('incident');
    navBus.toEventStream().log();
    searchBus.toEventStream().log();
    return {
      searchBus: searchBus,
      navBus: navBus,
      navProperty: navProperty,
    };
  }
);


