/*global define, Bootstrap */
// Author: Cormac McGuire  
// ### TabRouter
// 
// Backbone Router  
// handles clicks on the three tabs and sends messages into the navStream
// defined in streams.js based on this  
//
// TODO: handle bogey urls

define(
  [
    'jquery', 'backbone', 'underscore',
    'lib/streams',
    'lib/Data/collections'
  ],
  function($, Backbone, _, Streams, Collections) {
    'use strict';
    var tabRouter,
        navBus = Streams.navBus,
        tabView,

        filterTabNav = function(value) {
          return value.type === 'navigate';
        },
        filterEntityNav = function(value) {
          return value.type === 'entity-display';
        },

        // convert tab link argument to element
        convertToElement = function(value) {
          return  'li.is-' + value.content.entity + 's';
        };

    // ## TabRouter
    //
    // handle tab clicks
    // push an event to the navBus when the user clicks on a tab or a result  
    //
    // For the initial navigate if a user is on an individual result
    // we also want to open the filters and results at this point
    var TabRouter = Backbone.Router.extend({
      routes: {
        ''                    : 'openSection',
        'tab/:section'        : 'openSection',
        'bulletin/:bulletinId': 'openBulletin',
        'incident/:incidentId': 'openIncident',
        'actor/:actorId'      : 'openActor'
      },
      initialize: function() {
        this.watchForResultNav();
      },
      watchForResultNav: function() {
        var unsub = 
          navBus.toEventStream()
                .filter(filterEntityNav)
                .subscribe(this.navigateToSection.bind(this));
        this.unsubNavSubscriber = _.once(unsub);
      },

      navigateToSection: function(evt) {
        this.openSection(evt.value().entity);
      },

      openSection: function(section) {
        this.unsubNavSubscriber();
        section = section === undefined ? 'incident': section;
        navBus.push({
          type: 'navigate',
          content: {
            entity: section
          }
        });
      },
      openBulletin: function(bulletinId) {
        this.openEntity('bulletin', bulletinId);
      },
      openIncident: function(incidentId) {
        this.openEntity('incident', incidentId);
      },
      openActor: function(actorId) {
        this.openEntity('actor', actorId);
      },
      openEntity: function(type, id) {
        navBus.push({
          type: 'entity-display',
          content: {
            entity: type,
            id    : id
          }
        });
      }

    });

    // ## TabView
    //
    // This represents the three tabs  
    // It simply sets the current class on the last clicked  
    // tab, in response to a navigation change in the router above  
    // display the total results for each bulletin/actor/incident
    var TabView = Backbone.View.extend({
      el: '.tabs ul',
      initialize: function() {
        Streams.navBus.toEventStream()
                      .toProperty()
                      .filter(filterTabNav)
                      .map(convertToElement)
                      .onValue(this.updateTabClass);
        this.watchCollectionCounts();
        this.initCollectionCounts();
      },
      initCollectionCounts: function() {
        this.setCollectionCount('bulletin', Collections.BulletinCollection.length);
        this.setCollectionCount('actor', Collections.ActorCollection.length);
        this.setCollectionCount('incident', Collections.IncidentCollection.length);
      },
      setCollectionCount: function(entity, count) {
        $('.' + entity + '-count').empty().append(count);
      },
      // bind to the three main collections and update the counts when they
      // change
      watchCollectionCounts: function() {
        Collections.BulletinCollection.on('add destroy reset', function() {
          this.setCollectionCount('bulletin', Collections.BulletinCollection.length);
        }, this);
        Collections.ActorCollection.on('add destroy change reset', function() {
          this.setCollectionCount('actor', Collections.ActorCollection.length);
        }, this);
        Collections.IncidentCollection.on('add destroy reset', function() {
          this.setCollectionCount('incident', Collections.IncidentCollection.length);
        }, this);
      },

      // update the class on the current tab
      updateTabClass: function(el) {
        $(el).siblings().removeClass('current');
        $(el).addClass('current');
      }

    });

    // init function  
    // create our objects
    var init = function(navBus) {
      tabView = new TabView();
      tabRouter = new TabRouter({navBus: navBus});
      Backbone.history.start({
        root: 'tabs/incident'
      });
      return tabRouter;
    };

    return {
      init: init
    };
  }
);
