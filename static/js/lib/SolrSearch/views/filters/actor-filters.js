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
    // filter elements
    'lib/SolrSearch/views/filters/filter-elements',
    // templates
    'lib/SolrSearch/templates/actor-filters.tpl',
    'lib/SolrSearch/templates/selected-filters.tpl',
  ],
  function (_, $, Backbone, Handlebars, Streams, FilterCollection,
    FilterElements, actorFiltersTmp, selectedFiltersTmp) {
    'use strict';
    var ActorFilterView,
        NewActorButtonView,
        FilterGroupView = FilterElements.FilterGroupView,
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
      filterGroupViews: [],

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.collection = ActorFilterCollection;
        this.collection.on('reset', this.render, this);
        this.createSelectedFiltersGroup();
        this.render();
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

      // unset event handlers and destroy DOM elements
      destroy: function() {
        this.destroyFilterGroupViews();
        this.selectedFiltersView.destroy();
        this.selectedFiltersView = undefined;
        this.undelegateEvents();
        this.collection.off('reset', this.render);
        this.$el.remove();
      },
      
      // destroy the subviews
      destroyFilterGroupViews: function() {
        _.each(this.filterGroupViews, function(view) {
          view.destroy();
        });
        this.filterGroupViews = [];
      },

      //render the container element
      render: function() {
        console.log('renderContainer');
        var renderContainer = _.once(this.renderContainer, this);
        renderContainer(this);
        this.destroyFilterGroupViews();
        this.renderFilterGroups();
      },

      // render the container
      renderContainer: function(self) {
        console.log(self.$el);
        var html = actorFiltersTmp();
        self.$el.empty()
                .append(html);
        self.selectedFiltersView.setElement('.selected-actor-filters');
        console.log($('.selected-actor-filters').length);
      },

      // render the filter groups
      renderFilterGroups: function() {
        this.filterGroupViews = this.collection.map(this.renderGroup, this);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-actor-filters',
          collection: SelectedActorFilterCollection,
          type: 'actor'
        });
      },

      // render a filter group
      renderGroup: function(model) {
        var filterGroupView = new FilterGroupView({
          model: model
        });
        this.$el.append(filterGroupView.$el);
        return filterGroupView;
      }
    });
    
    // module export
    return {
      ActorFilterView: ActorFilterView,
    };
});
