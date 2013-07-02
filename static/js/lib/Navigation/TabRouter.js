/*global define, Bootstrap */
/**
### TabRouter

handle tab presses

*/
define(
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/Data/collections'

  ],
  function($, Backbone, Streams, Collections) {
    'use strict';
    var tabRouter,
        tabView;

    /**
     * convert tab link argument to element
     */
    var convertToElement = function(className) {
      return  'li.is-' + className + 's';
    };

    /**
     * ## TabRouter
     *
     * handle tab clicks
     * push an event to the navBus when the user clicks on a tab
     */
    var TabRouter = Backbone.Router.extend({
      routes: {
        'tab/:section': 'openSection'
      },
      openSection: function(section) {
        Streams.navBus.push(section);
      }
    });

    /**
     * ## TabView
     *
     * This represents the three tabs
     * It simply sets the current class on the last clicked
     * tab, in response to a navigation change in the router above
     * it has no real backbone functionality, we could either get rid of this
     * or the router 
     */
    var TabView = Backbone.View.extend({
      el: '.tabs ul',
      initialize: function() {
        Streams.navBus.toEventStream()
                      .toProperty()
                      .map(convertToElement)
                      .onValue(this.updateTabClass);
        this.watchCollectionCounts();
      },
      watchCollectionCounts: function() {
        Collections.BulletinCollection.on('add destroy reset', function() {
          $('.bulletin-count').empty()
                              .append(Collections.BulletinCollection.length);
        }, this);
        Collections.ActorCollection.on('add destroy change reset', function() {
          $('.actor-count').empty()
                           .append(Collections.ActorCollection.length);
        }, this);
        Collections.IncidentCollection.on('add destroy reset', function() {
          $('.incident-count').empty()
                              .append(Collections.IncidentCollection.length);
        }, this);
      },

      updateTabClass: function(el) {
        $(el).siblings().removeClass('current');
        $(el).addClass('current');
      }

    });

    // create our objects
    var init = function(navBus) {
      tabView = new TabView();
      tabRouter = new TabRouter({navBus: navBus});
      Backbone.history.start();
      return tabRouter;
    };

    return {
      init: init
    };
  }
);
