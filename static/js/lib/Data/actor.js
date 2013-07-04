/*global Bootstrap*/
//
// Author Cormac McGuire
//
// actor.js
//
// Represent a single actor and a group of actors
//
// TODO: refactor common logic for all collections

define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {
    'use strict';

    // ### event stream processing helpers
    // particular to actors
    var filterActorResults = function(value) {
      return value.type === 'results_actor';
    };
    var filterActor = function(value) {
      return value.navValue === 'actor';
    };
    var mapSort = function(value) {
      var sortMap = {
        'date': 'actor_created',
        'title': 'fullname_en'
      };
      return sortMap[value];
    };

    //////////////////////////////////////////////////////////////////////
    // common to all collections
    //
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

    // ### Actor Model
    // provide api endpoint for Actor model
    var ActorModel = Backbone.Model.extend({
      idAttribute: 'django_id',
      url: function() {
        var base = '/api/v1/actor/';
        if (this.id) {
          base = base + this.id + '/';
        }
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    // ### Actor Collection
    var ActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      compareField: 'actor_created',
      initialize: function() {
        this.watchSearchResults();
        this.watchSelection();
        this.watchSort();
      },
      // sort is implemented based on the result of this function
      comparator: function(model) {
        return model.get(this.compareField);
      },
      setComparatorField: function() {
      },
      // watch the search bus to update the actor collection when new actor
      // results are received from solr
      watchSearchResults: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterActorResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },

      // watch for selections from the action combo box
      watchSelection: function() {
        var self = this;
        var actorStream = Streams.searchBus.filter(filterActor);

        actorStream.filter(filterSelectAll)
          .onValue(function() {
          self.selectAll();
        });
        actorStream.filter(filterUnselectAll)
          .onValue(function() {
          self.unSelectAll();
        });
        actorStream.filter(filterDeleteSelected)
          .onValue(function() {
          self.deleteSelected();
        });
      },

      //
      // listen for sort request events
      // originate from header.js in SolrSearch views
      //
      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'filter_view_combined';
        })
        .filter(filterActor)
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
      // unselect models
      unSelectAll: function(model) {
        this.each(function(model) {
          this.toggleSelection(model, '');
        }, this);
      }
    });


    return {
      ActorCollection: ActorCollection,
      ActorModel: ActorModel
    };
});
