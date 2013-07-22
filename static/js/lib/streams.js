/*global window, document, define */
// Author: Cormac McGuire  
// define the streams that are used to pass messages between modules  
//
define(
  ['bacon'],
  function(Bacon) {
    'use strict';
    var searchBus = new Bacon.Bus(),
        navBus = new Bacon.Bus(),
        navProperty = navBus.toProperty('incident');
    //navBus.toEventStream().log();
    //searchBus.toEventStream().log();
    return {
      searchBus: searchBus,
      navBus: navBus,
      navProperty: navProperty
    };
  }
);
