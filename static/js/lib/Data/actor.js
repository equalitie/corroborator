define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {

    // event stream processing helpers
    var extractResults = function(value) {
      return value.content;
    };

    var filterActorResults = function(value) {
      return value.type === 'results_actor';
    };

    // Data representations
    var ActorModel = Backbone.Model.extend({
      idAttribute: 'django_id',
      url: function() {
        var base = '/api/v1/actor/';
        var urlvars = "?format=json&username=" +
        Bootstrap.username + "&api_key=" + Bootstrap.apiKey;
          return base + urlvars;
      }
    });

    var ActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      initialize: function() {
        this.watchSearchResults();
        this.watchSelection();
      },
      watchSearchResults: function() {
        var self = this;
        Streams.searchBus.toProperty()
               .filter(filterActorResults)
               .map(extractResults)
               .onValue(function(results) {
                 self.reset(results);
               });
      },

      watchSelection: function() {
        var self = this;

        // particular to actors
        var filterActor = function(value) {
          return value.navValue === 'actor';
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
        Streams.searchBus.filter(filterActor)
                         .filter(filterSelectAll)
                         .onValue(function() {
                           self.selectAll();
                         });
        Streams.searchBus.filter(filterActor)
                         .filter(filterUnselectAll)
                         .onValue(function() {
                           self.unSelectAll();
                         });
        Streams.searchBus.filter(filterActor)
                         .filter(filterDeleteSelected)
                         .onValue(function() {
                           self.deleteSelected();
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
      ActorCollection: ActorCollection,
      ActorModel: ActorModel
    };
});
