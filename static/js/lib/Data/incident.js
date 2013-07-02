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

    var filterIncident = function(value) {
      return value.navValue === 'incident';
    };

    var filterIncidentResults = function(value) {
      return value.type === 'results_incident';
    };
    var mapSort = function(value) {
      var sortMap = {
        'date': 'bulletin_created',
        'title': 'title_en',
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


    var IncidentModel = Backbone.Model.extend({
      idAttribute: 'django_id',
      url: function() {
        var base = '/api/v1/incident/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }

    });

    var IncidentCollection = Backbone.Collection.extend({
      model: IncidentModel,
      initialize: function() {
        this.watchEventStream();
        this.watchSelection();
        this.watchSort();
      },
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterIncidentResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },
      watchSelection: function() {
        var self = this;
        var incidentStream = Streams.searchBus.filter(filterIncident);

        incidentStream.filter(filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        incidentStream.filter(filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        incidentStream.filter(filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterIncident)
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
    IncidentModel: IncidentModel,
    IncidentCollection: IncidentCollection
  };


});

