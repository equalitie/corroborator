/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// This contains mixins for the collection objects  
// The mixins are logic that is shared across all the collections

define (
  [
    'underscore', 'backbone', 'moment', 'lib/streams'
  ],
  function (_, Backbone, moment, Streams) {
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
            return value.option === 'clear';
          },
          filterSelectAll: function(value) {
            return value.option === 'select';
          },
          filterDeleteSelected: function(value) {
            return value.option === 'delete';
          }
        },
        CollectionUpdateMixin = {
          // watch for updates to the models in the collection
          watchUpdate: function() {
            Streams.searchBus.filter(this.updateFilter)
                             .onValue(this.updateModels.bind(this));
          },

          // update the models without triggering a re-render of the list view
          // fired after update selected completes
          multiUpdateModels: function (value) {
            var entities = value.content;
            this.set(entities, {
              remove: false,
              silent: true
            });
            _(entities).each(function(entity) {
              this.get(entity.id).trigger('render');
            }, this);
          },

          updateModels: function(value) {
            _(value.content)
              .chain()
              .filter(function(updateItem) {
                return this.get(updateItem.id) !== undefined;
              }, this)
              .filter(function(updateItem) {
                var modelModified =
                      moment(this.get(updateItem.id).get(this.modifiedField)),
                    updateItemModified = moment(updateItem.update);
                return modelModified.isBefore(updateItemModified);
              }, this)
              .map(function(item) {
                return this.get(item.id);
              }, this)
              .each(function (model) {
                model.fetch();
              });
          }
        },
        ModelSelectionMixin = {
          // change the selected state of a single model
          toggleSelection: function(model, checked) {
            model.set({checked: checked});
          },
          
          // load the model from the collection if available or from the database if not
          getEntity: function (id, entityType) {
            var entity = this.get(id) ||
              new this.model({resourceUri: '/api/v1/' + entityType + '/' + id + '/'});
            this.add(entity);
            return entity;
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
        ModelSaveMixin = {
          parse: function(response) {
            response.id = response.django_id || response.id;
            return response;
          },
          formatIntegerFields: function() {
            _.each(this.intFields, this.formatIntegerField, this);
            return this;
          },
          formatIntegerField: function(key) {
            this.set(key, parseInt(this.get(key), 10));
            if (_.isNaN(this.get(key)) ||
                this.get(key) === null ||
                this.get(key) === undefined ||
                this.get(key) === "") {
              this.unset(key);
            }
          },

          //iterate over the many to many fields and format if necessary
          formatManyToManyFields: function() {
            _.chain(this.manyToManyFields)
             .filter(this.filterSingleValueFields, this)
             .each(this.wrapAsArray, this);
             return this;
          },
          //iterate over the many to many fields and format if necessary
          formatEmptyManyToManyFields: function() {
            _.chain(this.manyToManyFields)
             .filter(this.filterEmptyFields, this)
             .each(this.createEmptyArray, this);
             return this;
          },
          
          createEmptyArray: function(key) {
            this.set(key, []);
          },
          
          filterEmptyFields: function(key) {
            return this.get(key) === undefined;
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
             this.set(key, [this.get(key)]);
          },

          // remove any date time or foreign key fields with no values
          removeEmptyDateFields: function() {
            _.each(this.dateFields, this.removeEmptyField, this);
            return this;
          },

          removeEmptyDateTimeFields: function() {
            _.each(this.dateTimeFields, this.removeEmptyField, this);
            return this;
          },

          removeEmptyForeignKeyFields: function() {
            _.each(this.foreignKeyFields, this.removeEmptyField, this);
            return this;
          },

          formatEmptyTextFields: function() {
            _.each(this.textFields, this.formatEmptyTextField, this);
            return this;
          },

          formatEmptyTextField: function(key) {
            if( this.get(key) === undefined) {
              this.set(key, '');
            }
          },

          // remove any empty fields
          removeEmptyField: function(key) {
            if (this.get(key) === '') {
              this.unset(key);
            }
            return this;
          },
          // apply our formatting methods and then delegate to builtin
          // backbone sync
          sync: function(method, model) {
            var createEditMethods = ['create', 'update'];
            if (_.contains(createEditMethods, method)) {
              this.removeEmptyForeignKeyFields()
                  .formatEmptyTextFields()
                  .removeEmptyDateTimeFields()
                  .removeEmptyDateFields()
                  .formatManyToManyFields()
                  .formatIntegerFields()
                  .formatEmptyManyToManyFields();
            }
            this.set('username', Bootstrap.username);
            return Backbone.sync.apply(this, arguments);
          }
        };

  _.extend(Filters.prototype, filterFunctions);


  return {
    Filters              : Filters,
    PersistSelectionMixin: PersistSelectionMixin,
    ModelSaveMixin       : ModelSaveMixin,
    ModelSelectionMixin  : ModelSelectionMixin,
    CollectionUpdateMixin: CollectionUpdateMixin
  };
});



