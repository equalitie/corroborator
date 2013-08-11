/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the related events

define (
  [
    'backbone', 'lib/elements/views/CollectionViews',
    'lib/CRUD/data/EventCollection',
    'lib/CRUD/templates/display-templates/events/event.tpl',
    'lib/CRUD/templates/display-templates/events/event-container.tpl'
  ],
  /**
   *   
   */
  function (Backbone, CollectionViews, Event, eventTmp, eventContainerTmp) {
    'use strict';
    var EventListView, EventView,
        EventModel = Event.EventModel,
        ListView = CollectionViews.ListView,
        ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView;

    EventView = ModelView.extend({
      template: eventTmp
    });

    EventListView = ListLoadView.extend({
      modelType: EventModel,
      childView: EventView,
      childViews: [],
      fieldType: 'events',
      containerTmp: eventContainerTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }
    });

  return EventListView;    

});

