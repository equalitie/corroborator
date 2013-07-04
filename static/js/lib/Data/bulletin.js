/*global Bootstrap*/
// Author: Cormac McGuire  
// bulletin.js  
// Represent a single bulletin and a group of bulletins  
// TODO: refactor common logic for all collections
define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {
    'use strict';

    // ### Bulletin Specific filter stream processors

    // filter bulletin nav requests
    var filterBulletin = function(value) {
      return value.navValue === 'bulletin';
    };

    // filter out bulletin results
    var filterBulletinResults = function(value) {
      return value.type === 'results_bulletin';
    };

    // map sort request to model field
    var mapSort = function(value) {
      var sortMap = {
        'date': 'bulletin_created',
        'title': 'title_en',
        'score': 'confidence_score'
      };
      return sortMap[value];
    };
    // ### common to all collections  
    // TODO: refactor to share accross collections
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

    // ##Data representations


    // ### Bulletin Model
    // provide api endpoint for Bulletin model
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

    // ### Bulletin Collection
    // provide sort, selection functionality  
    // stores bulletins 
    var BulletinCollection = Backbone.Collection.extend({
      compareField: 'bulletin_created',
      model: BulletinModel,
      initialize: function() {
        this.watchEventStream();
        this.watchSelection();
        this.watchSort();
      },
      // models are sorted based on the result of this function
      comparator: function(model) {
        return model.get(this.compareField);
      },
      // watch the search bus to update the bulletin collection when new  
      // bulletin results are received from solr
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterBulletinResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },

      // watch for selections from the action combo box
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

      // listen for sort request events  
      // these originate from header.js in SolrSearch views
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterBulletin)
        .map(extractOption)
        .map(mapSort)
        .onValue(function (value) {
          self.compareField = value;
          self.sort();
        });
      },

      // #### common to all collections

      // change the selected state of a single model
      toggleSelection: function(model, checked) {
        model.set({checked: checked});
      },

      // delete selected models
      deleteSelected: function() {
        var getSelected = function(model) {
          return model.get('checked') === 'checked';
        };
        var deleteModel = function(model) {
          model.destroy();
        };
        _.each(this.filter(getSelected), deleteModel);
      },

      // select all models
      selectAll: function() {
        this.each(function(model) {
          this.toggleSelection(model, 'checked');
        }, this);
      },

      // unselect all models
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
