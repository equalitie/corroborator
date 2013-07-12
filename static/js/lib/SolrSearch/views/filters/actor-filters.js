/*global define, Bacon */
// ### Description
// 
// Display the actor filters available via ActorFilterView
// and filters in use via ActorFiltersSelectedView
define(
  [
    // vendor
    'underscore', 'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    //data
    'lib/SolrSearch/data/filter-collections',
    // filter mixins
    'lib/SolrSearch/views/filters/filter-mixins',
    'lib/SolrSearch/views/filters/filter-elements',
    // templates
    'lib/SolrSearch/templates/actor-filters.tpl'
  ],
  function (_, $, Backbone, Handlebars, Streams, FilterCollection,
    Mixins, FilterElements, actorFiltersTmp) {
    'use strict';
    var ActorFilterView,
        NewActorButtonView,
        FilterViewMixin = Mixins.FilterViewMixin,
        ActorFilterCollection = FilterCollection.ActorFilterCollection,
        SelectedActorFilterCollection = 
          FilterCollection.SelectedActorFilterCollection,
        SelectedFiltersView = FilterElements.SelectedFiltersView;

    // ### NewActorButtonView
    // show the new actor button
    NewActorButtonView = Backbone.View.extend({
      el: '.actor-display div.padding div.group',
      initialize: function() {
        this.template = _.template('<button class="do-create-actor create">' +
          '<span class="text T">New actor</span> </button>');
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        this.$el.append(this.template());
      }
    });
    
    // ## Actor filter view
    // display a list of filters for actors
    ActorFilterView = Backbone.View.extend({
      el: '.right-filters',
      events : {
        'click button.do-create-actor': 'createActorPressed'
      },
      // store the sub views so we can get rid of them later

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.render();
        this.collection = ActorFilterCollection;
        this.renderExistingCollection();
        this.collection.on('reset', this.renderFilterGroups, this);
        this.createSelectedFiltersGroup();
      },

      // respond to new actor button press  
      // send event on search bus 
      createActorPressed: function(e) {
        var createActorEvent = {
          content: {},
          type: 'create_actor'
        };
        Streams.searchBus.push(createActorEvent);
      },

      // render the container
      render: function() {
        var html = actorFiltersTmp();
        this.$el.empty()
                .append(html);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-actor-filters',
          collection: SelectedActorFilterCollection,
          type: 'actor'
        });
      }

    });
    _.extend(ActorFilterView.prototype, FilterViewMixin);
    
    // module export
    return {
      ActorFilterView: ActorFilterView,
    };
});
