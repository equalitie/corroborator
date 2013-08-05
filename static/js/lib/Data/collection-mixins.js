/*global define*/
// Author: Cormac McGuire
// ### Description
// This contains mixins for the collection objects  
// The mixins are logic that is shared across all the collections

define (
  [
    'underscore', 'backbone'
  ],
  function (_, Backbone) {
    'use strict';

        // common to all collections  
        // TODO: write tests for our mixins
    var Filters = function(){},
        filterFunctions = {
          extractOption: function(value) {
            return value.option;
          },
          extractResults: function(value) {
            return value.content;
          },
          filterUnselectAll: function(value) {
            return value.option === 'Clear Selected';
          },
          filterSelectAll: function(value) {
            return value.option === 'Select All';
          },
          filterDeleteSelected: function(value) {
            return value.option === 'Delete Selected';
          }
        },
        ModelSelectionMixin = {
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
        },
        PersistSelectionMixin = {
          // update a list of selected ids - used to persist selection across
          // searches
          updateSelectedIdList: function() {
            this.selectedIdList = this.chain()
                                 .filter(function(model){ 
                                   return model.get('checked') === 'checked';
                                 })
                                 .map(function(model) {
                                   return model.get('id');
                                 })
                                 .value();
          },
          updateSelectedIdListAfterReset: function() {
            var allIds = this.map(function(model) { return model.get('id'); });
            this.selectedIdList = _.intersection(allIds, this.selectedIdList);
          },

          // reselect models after collection is reset - happens after a search
          // or filter
          selectModelsAfterReset: function() {
            this.updateSelectedIdListAfterReset();
            var self = this;
            this.chain()
                .filter(function(model) {
                  return _.indexOf(self.selectedIdList, model.get('id')) !== -1;
                })
                .each(this.selectModelInList);
          },

          selectModelInList: function(model) {
            model.set('checked', 'checked');
          }
        },

        // ### helper methods for persisting models with tastypie  
        // formats many to many fields  
        // removes empty foreign key fields  
        // removes empty date fields  
        ModelSyncMixin = {
          parse: function(response) {
            response.id = response.django_id;
            return response;
          },

          //iterate over the many to many fields and format if necessary
          formatManyToManyFields: function() {
            _.chain(this.manyToManyFields)
             .filter(this.filterSingleValueFields, this)
             .each(this.wrapAsArray, this);
          },

          // filter out many to many fields that only have one value set
          filterSingleValueFields: function(key) {
            if (this.get(key) === undefined) {
              return false;
            }
            return typeof(this.get(key)) === 'string' &&
                   this.get(key).length > 0;
          },

          // wrap many to many single value fields in an array - required
          // by the backend
          wrapAsArray: function(key) {
            console.log(key);
             this.set(key, [this.get(key)]);
          },

          // remove any date time or foreign key fields with no values
          removeEmptyDateFields: function() {
            _.each(this.dateFields, this.removeEmptyField, this);
          },

          removeEmptyDateTimeFields: function() {
            _.each(this.dateTimeFields, this.removeEmptyField, this);
          },

          removeEmptyForeignKeyFields: function() {
            _.each(this.foreignKeyFields, this.removeEmptyField, this);
          },

          // remove any empty fields
          removeEmptyField: function(key) {
            if (this.get(key) === '') {
              this.unset(key);
            }
          },
          // apply our formatting methods and then delegate to builtin
          // backbone sync
          sync: function(method, model) {
            var createEditMethods = ['create', 'update'];
            if (_.contains(createEditMethods, method)) {
              this.removeEmptyForeignKeyFields();
              this.removeEmptyDateTimeFields();
              this.removeEmptyDateFields();
              this.formatManyToManyFields();
            }
            return Backbone.sync.apply(this, arguments);
          }
        };

  _.extend(Filters.prototype, filterFunctions);

    // create a collection that holds all elements
    var SuperCollection = {
      createSuperCollection: function() {
        var initSuperCollection = _.once(this.createInitialCollection);
        this.on('reset', initSuperCollection, this);
        this.on('add', this.addToSuperCollection, this);
        this.on('remove', this.addToSuperCollection, this);
      },
      createInitialCollection: function() {
        this.superCollection = new Backbone.Collection(this.models);
      },
      addToSuperCollection: function(model) {
        this.superCollection.add(model);
      },
      removeFromSuperCollection: function(model) {
        this.superCollection.remove(model);
      },
      getList: function(idArray) {

      }
    };

  return {
    SuperCollection      : SuperCollection,
    Filters              : Filters,
    PersistSelectionMixin: PersistSelectionMixin,
    ModelSyncMixin       : ModelSyncMixin,
    ModelSelectionMixin  : ModelSelectionMixin
  };
});



