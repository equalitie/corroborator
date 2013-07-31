/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// display an embedded search result for an location

define (
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/CRUD/templates/location-result.tpl',
  ],
  function ($, Backbone, Streams, locationResultTmp) {
    'use strict';

    var LocationResultView,
        crudBus = Streams.crudBus;

    // ### LocationResultView
    // 
    LocationResultView = Backbone.View.extend({
      template: locationResultTmp,
      tagName: 'li',
      events: {
        'click .do-relate': 'relateToEntity',
        'click .do-remove': 'removeLocation'
      },
      // constructor
      initialize: function(options) {
        if (options.type === undefined) {
          throw "You must specify a type";
        }
        this.type = options.type;
        this.render();
      },
      // send a message asking to relate this location to the current  
      // entity being edited
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_location_request',
          content: {
            model: this.model
          }
        });
      },

      // remove the location from the current entity
      removeLocation: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        crudBus.push({
          type: 'unrelate_location_request',
          content: {
            model: this.model
          }
        });
      },

      // unsubscribe from dom events and remove the element
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      resetFlags: function() {
        this.model.unset('selected');
        this.model.unset('result');
      },

      // render the template
      render: function() {
        this.resetFlags();
        this.model.set(this.type, true);
        var templateVars = {
          model: this.model.toJSON(),
        };
        var html = this.template(templateVars);
        this.$el.append(html);
      }
    });

    return LocationResultView;
    
});
