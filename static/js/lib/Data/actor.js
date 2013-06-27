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

    var filterActions = function(value) {
      return value.type === 'action_combo';
    };
    var filterActorResults = function(value) {
      return value.type === 'results_actor';
    };

    // Data representations
    var ActorModel = Backbone.Model.extend({
      idAttribute: 'django_id'
    });

    var ActorCollection = Backbone.Collection.extend({
      model: ActorModel,
      initialize: function() {
        this.watchEventStream();
        this.watchSelection();
      },
      watchEventStream: function() {
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
        Streams.searchBus.toProperty()
               .filter(filterActions)
               .map(extractResults)
               .onValue(function(model) {
                 if (model.get('name_en') === 'Select All') {
                   self.selectAll();
                 }
                 else if (model.get('name_en') === 'Clear Selected') {
                   self.unSelectAll();
                 }
               });
      },
      toggleSelection: function(model, checked) {
        model.set({checked: checked});
        
      },
      selectAll: function() {
        this.each(function(model) {
          this.toggleSelection(model, 'checked');
        }, this);
        console.log(this);
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
