/*global Bootstrap*/

// Author: Cormac McGuire  
// bulletin.js  
// Represent a single bulletin and a group of bulletins  
// TODO: refactor common logic for all collections  

define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams',
    'lib/Data/collection-mixins',
    'lib/Data/comparator',
    'lib/elements/helpers/cookie'
  ],
  function($, _, Backbone, Streams, Mixins, Comparator, 
    cookie) {
    'use strict';
    // ### event stream processing helpers
    // particular to actors
     var filterIncident = function(value) {
          return value.navValue === 'incident';
        },

        filterUpdatedIncidents = function(value) {
          return value.type === 'multiple_update_results_incidents';
        },
        filterIncidentResults = function(value) {
          return value.type === 'results_incident';
        },
        crudBus               = Streams.crudBus,
        searchBus             = Streams.searchBus,
        ModelSaveMixin        = Mixins.ModelSaveMixin,
        PersistSelectionMixin = Mixins.PersistSelectionMixin,
        ModelSelectionMixin   = Mixins.ModelSelectionMixin,
        Filters               = new Mixins.Filters(),
        parseComparator       = Comparator.parseComparator,
        mapResourceUriToId = function(resourceUri) {
          return _.last(resourceUri.match(/\/(\d+)\/$/));
        },
        mapSort = function(value) {
          var sortMap = {
            'date': 'incident_created',
            'title': 'title_en',
            'score': 'confidence_score',
            'status': 'most_recent_status_incident',
            'location': 'incident_locations'
          };
          return sortMap[value];
        };



    // ##Data representations
    var IncidentListUpdateModel = Backbone.Model.extend({
      textFields: [
      ],
      intFields: [
        'confidence_score'
      ],
      manyToManyFields: [
        'actors', 'ref_bulletins', 'crimes', 'ref_incidents', 'locations',
        'labels'
      ],
      url: '/corroborator/incident/0/multisave/',
      formatSaveMultiple: function() {
        this.set('actorsRoles',
          this.get('relatedActors').map(this.formatActorCollectionForSave, this));
        this.unset('actors_role');
        return this.toJSON();
      },
      formatActorCollectionForSave: function(model) {
        return {
          actor: model.get('actor'),
          role_en: model.get('role_en'),
          role_status: model.get('role_status')
        };
      },
      updateResults: function(model, updatedIncidents) {
        searchBus.push({
          type: 'multiple_update_results_incidents',
          content: updatedIncidents.objects
        });
      },
      updateError: function() {
      },
      saveMultiple: function() {
        var attributes = this.formatSaveMultiple();
        this.save(attributes, {
          success: this.updateResults.bind(this),
          error: this.updateError.bind(this),
          headers: {
            'X-CSRFToken':cookie
          }
        });
      }
    });
    _.extend(IncidentListUpdateModel.prototype, ModelSaveMixin);

    // ### Incident Model
    // provide api endpoint for Incident model
    var IncidentModel = Backbone.Model.extend({
      idAttribute: 'id',
      intFields: [
        'confidence_score'
      ],
      foreignKeyFields: [
        'assigned_user'
      ],
      manyToManyFields: [
        'crimes', 'labels', 'incident_comments', 'times', 'actors_role',
        'ref_bulletins', 'ref_incidents', 'locations'
      ],
      initialize: function(options) {
        this.set('entityType', 'incident');
        if (options.resourceUri !== undefined) {
          var id = mapResourceUriToId(options.resourceUri);
          this.set('django_id', id);
          this.set('resource_uri', options.resourceUri);
          this.id = id;
          this.fetch();
        }
      },
      url: function() {
        var base = '/api/v1/incident/';
        if (this.id) {
          base = this.get('resource_uri');
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }

    });
    _.extend(IncidentModel.prototype, ModelSaveMixin);

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
        return parseComparator(model.get(this.compareField));
      },

      // watch the search bus to update the incident collection when new  
      // incident results are received from solr
      watchEventStream: function() {
        var self = this;
        searchBus.toProperty()
                 .filter(filterIncidentResults)
                 .map(Filters.extractResults)
                 .onValue(this.resetCollection.bind(this));
        searchBus.filter(filterUpdatedIncidents)
                 .onValue(function(value) {
                   this.set(value.content, {remove: false});
                 }.bind(this));
      },
      resetCollection: function(results) {
        if (this.length !==0) {
          _.map(results, function(result) {
            result.id = result.django_id;
          });
          this.set(results);
          this.trigger('reset');
        }
        else {
          this.reset(results, {parse: true});
        }
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
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterIncident)
        .map(Filters.extractOption)
        .map(mapSort)
        .onValue(function (value) {
          this.compareField = value;
          this.sort();
        }.bind(this));
      },
      watchCreate: function() {
        var self = this;
        crudBus.filter(function(value) { return value.type === 'create_new_incident'; })
               .onValue(function(value) {
                 self.add(value.content);
               });
      }

    });
    // add our mixins to the collection
    _.extend(IncidentCollection.prototype, PersistSelectionMixin);
    _.extend(IncidentCollection.prototype, ModelSelectionMixin);

  return {
    IncidentModel: IncidentModel,
    IncidentCollection: IncidentCollection,
    IncidentListUpdateModel: IncidentListUpdateModel
  };
});
