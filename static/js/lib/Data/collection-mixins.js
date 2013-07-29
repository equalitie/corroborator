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
          formatManyToManyFields: function() {
            _.chain(this.manyToManyFields)
             .filter(this.filterEmptyFields, this)
             .each(this.setEmptyArray, this);

            _.chain(this.manyToManyFields)
             .filter(this.filterSingleValueFields, this)
             .each(this.wrapAsArray, this);
          },

          filterEmptyFields: function(key) {
            return this.get(key) ==='';
          },
          setEmptyArray: function(key) {
            this.set(key, []);
          },

          filterSingleValueFields: function(key) {
            return typeof(this.get(key) === 'string') &&
                   this.get(key).length > 0;
          },

          wrapAsArray: function(key) {
            return [this.get(key)];
          },

          removeEmptyDateFields: function() {
            _.each(this.dateFields, this.removeEmptyField, this);
          },
          removeEmptyDateTimeFields: function() {
            _.each(this.dateTimeFields, this.removeEmptyField, this);
          },
          removeEmptyForeignKeyFields: function() {
            _.each(this.foreignKeyFields, this.removeEmptyField, this);
          },
          removeEmptyField: function(key) {
            if (this.get(key) === '') {
              this.unset(key);
            }
          },
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

  return {
    Filters              : Filters,
    PersistSelectionMixin: PersistSelectionMixin,
    ModelSyncMixin       : ModelSyncMixin,
    ModelSelectionMixin  : ModelSelectionMixin
  };
});



