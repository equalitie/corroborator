define(
  [
    'jquery', 'underscore', 'backbone',
    'lib/streams'
  ],
  function($, _, Backbone, Streams) {

    // event stream processing helpers

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
        'title': 'fullname_en',
        //'status': '
      };
      return sortMap[value];
    };

    // common to all collections
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

    // Data representations
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

    // Collection representing all actors
    var ActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      compareField: 'actor_created',
      initialize: function() {
        this.watchSearchResults();
        this.watchSelection();
        this.watchSort();
      },
      comparator: function(model) {
        return model.get(this.compareField);
      },
      setComparatorField: function() {
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

      watchSort: function() {
        var self = this;
        Streams.searchBus.filter(function(value) {
          return value.type === 'header_view_combined';
        })
        .filter(filterActor)
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
