define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {
    'use strict';
    var extractResults = function(value) {
      return value.content;
    };

    var filterBulletinResults = function(value) {
      return value.type === 'results_bulletin';
    };

    var BulletinModel = Backbone.Model.extend({
      idAttribute: 'django_id'
    });

    var BulletinCollection = Backbone.Collection.extend({
      model: BulletinModel,
      initialize: function() {
        this.watchEventStream();
      },
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterBulletinResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      }
    });

  return {
    BulletinModel: BulletinModel,
    BulletinCollection: BulletinCollection
  };


});

