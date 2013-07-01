/*global Bootstrap*/
/**
 * Author Cormac McGuire
 * bulletin.js
 * Represent a single bulletin and a group of bulletins
 * TODO: refactor common logic for all collections
 */
define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {
    'use strict';

    var filterBulletin = function(value) {
      return value.navValue === 'bulletin';
    };

    var filterBulletinResults = function(value) {
      return value.type === 'results_bulletin';
    };
    var mapSort = function(value) {
      var sortMap = {
        'date': 'bulletin_created',
        'title': 'fullname_en',
        'score': 'confidence_score',
        //'status': ''
      };
      return sortMap[value];
    };
    //////////////////////////////////////////////////////////////////////
    // common to all collections
    //////////////////////////////////////////////////////////////////////
    var extractOption = function(value) {
      return value.option;
    };
    var extractResults = function(value) {
      return value.content;
    };
    var filterUnselectAll = function(value) {
      return value.option === 'Clear Selected';
    };
    var filterSelectAll = function(value) {
      return value.option === 'Select All';
    };
    var filterDeleteSelected = function(value) {
      return value.option === 'Delete Selected';
    };
    //////////////////////////////////////////////////////////////////////
    // end common
    //////////////////////////////////////////////////////////////////////

    var BulletinModel = Backbone.Model.extend({
      idAttribute: 'django_id',
      url: function() {
        var base = '/api/v1/bulletin/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    var BulletinCollection = Backbone.Collection.extend({
      compareField: 'bulletin_created',
      model: BulletinModel,
      initialize: function() {
        this.watchEventStream();
        this.watchSelection();
        this.watchSort();
      },
      comparator: function(model) {
        return model.get(this.compareField);
      },
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterBulletinResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },
      watchSelection: function() {
        var self = this;
        var bulletinStream = Streams.searchBus.filter(filterBulletin);

        bulletinStream.filter(filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        bulletinStream.filter(filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        bulletinStream.filter(filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'header_view_combined';
        })
        .filter(filterBulletin)
        .map(extractOption)
        .map(mapSort)
        .onValue(function (value) {
          console.log(self.at(0));
          self.compareField = value;
          self.sort();
        });
      },

      toggleSelection: function(model, checked) {
        model.set({checked: checked});
      },

      deleteSelected: function() {
        var getSelected = function(model) {
          return model.get('checked') === 'checked';
        };
        var deleteModel = function(model) {
          console.log(model);
          model.destroy();
        };
        _.each(this.filter(getSelected), deleteModel);
      },

      selectAll: function() {
        console.log('selectAll');
        this.each(function(model) {
          this.toggleSelection(model, 'checked');
        }, this);
      },
      unSelectAll: function(model) {
        this.each(function(model) {
          this.toggleSelection(model, '');
        }, this);
      }
    });

  return {
    BulletinModel: BulletinModel,
    BulletinCollection: BulletinCollection
  };


});

