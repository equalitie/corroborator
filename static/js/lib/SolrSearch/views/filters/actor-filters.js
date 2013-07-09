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
        ActorFiltersSelectedView,
        FilterGroupView = FilterElements.FilterGroupView;

    // ## Actor filter view
    // display a list of filters for actors
    ActorFilterView = Backbone.View.extend({
      events : {
        'click button.do-create-actor': 'createActorPressed'
      },
      // store the sub views so we can get rid of them later
      filterGroupViews: [],

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.collection = FilterCollection.ActorFilterCollection;
        this.collection.on('reset', this.render, this);
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
        var html = actorFiltersTmp();
        this.$el.empty()
                .append(html);
        this.destroyFilterGroupViews();
        this.renderFilterGroups();
      },
      // render the filter groups
      renderFilterGroups: function() {
        this.collection.each(this.renderGroup, this);
      },
      // render a filter group
      renderGroup: function(model, index) {
        var filterGroupView = new FilterGroupView({
          model: model
        });
        this.$el.append(filterGroupView.$el);
        this.filterGroupViews.push(filterGroupView);
      }
    });
    
    // ### ActorFiltersSelectedView
    // Show a list of all selected filters
    // Allows users to remove these filters
    ActorFiltersSelectedView = Backbone.View.extend({
      initialize: function() {
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
      }
    });
    

    // module export
    return {
      ActorFilterView   : ActorFilterView,
    };
});
