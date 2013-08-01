/*global Bootstrap*/

// Author: Cormac McGuire  
// bulletin.js  
// Represent a single bulletin and a group of bulletins  
// TODO: refactor common logic for all collections  

define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/Data/collection-mixins'
  ],
  function($, _, Backbone, Streams, Mixins) {
    'use strict';
    // ### event stream processing helpers
    // particular to actors
     var filterIncident = function(value) {
          return value.navValue === 'incident';
        },

        filterIncidentResults = function(value) {
          return value.type === 'results_incident';
        },
        crudBus = Streams.crudBus,
        PersistSelectionMixin = Mixins.PersistSelectionMixin,
        ModelSelectionMixin = Mixins.ModelSelectionMixin,
        Filters = new Mixins.Filters(),
        mapSort = function(value) {
          var sortMap = {
            'date': 'incident_created',
            'title': 'title_en',
            'score': 'confidence_score'
            //'status': ''
          };
          return sortMap[value];
        };



    // ##Data representations

    // ### Actor Model
    // provide api endpoint for Actor model
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

    // ### Incident Collection
    // provide sort, selection functionality  
    // stores incidents 
    var IncidentCollection = Backbone.Collection.extend({
      model: IncidentModel,
      compareField: 'incident_created',
      initialize: function() {
        this.watchEventStream();
        this.watchSelection();
        this.watchSort();
        this.watchCreate();
        // event handlers for these are in the PersistSelectionMixin
        // TODO: have the mixin set these some way
        this.on('change', this.updateSelectedIdList, this);
        this.on('reset', this.selectModelsAfterReset, this);
      },

      // models are sorted based on the result of this function
      comparator: function(model) {
        return model.get(this.compareField);
      },
      // watch the search bus to update the incident collection when new  
      // incident results are received from solr
      watchEventStream: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterIncidentResults)
               .map(Filters.extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },
      // watch for selections from the action combo box
      watchSelection: function() {
        var self = this;
        var incidentStream = Streams.searchBus.filter(filterIncident);

        incidentStream.filter(Filters.filterSelectAll)
          .onValue(function() {
            self.selectAll();
          });
        incidentStream.filter(Filters.filterUnselectAll)
          .onValue(function() {
            self.unSelectAll();
          });
        incidentStream.filter(Filters.filterDeleteSelected)
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
        .filter(filterIncident)
        .map(Filters.extractOption)
        .map(mapSort)
        .onValue(function (value) {
          self.compareField = value;
          self.sort();
        });
      },
      watchCreate: function() {
        var self = this;
        crudBus.filter(function(value) { return value.type === 'create_new_incident'; })
               .onValue(function(value) {
                 console.log(value);
                 var incidentModel = new IncidentModel(value.content);
                 incidentModel.save();
                 self.add(incidentModel);
               });
      }

    });
    // add our mixins to the collection
    _.extend(IncidentCollection.prototype, PersistSelectionMixin);
    _.extend(IncidentCollection.prototype, ModelSelectionMixin);

  return {
    IncidentModel: IncidentModel,
    IncidentCollection: IncidentCollection
  };

});

