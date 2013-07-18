define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    'lib/streams',
    // templates
    'lib/SolrSearch/templates/filter-group.tpl',
    'lib/SolrSearch/templates/single-filter.tpl',
    'lib/SolrSearch/templates/selected-filters.tpl',
    'lib/SolrSearch/templates/selected-filter.tpl'
  ],
  function (_, $, Backbone, Streams, filterGroupTmp, singleFilterTmp,
    selectedFiltersTmp, selectedFilterTmp
  ) {
    'use strict';
    var FilterGroupView,
        SelectedFilterView,
        SelectedFiltersView,
        FilterView,
        searchBus = Streams.searchBus;

    // ### FilterGroupView
    // Render a group of filters
    FilterGroupView = Backbone.View.extend({
      className: 'filter',
      filterViews: [],
      // actor bulletin incident?
      type: '',

      // constructor
      initialize: function() {
        this.collection = this.model.get('collection');
        this.collection.on('add remove', this.render, this);
        this.render();
      },

      // destroy this view and it's subviews
      destroy: function() {
        _.invoke(this.filterViews, 'destroy');
        this.$el.remove();
        this.collection.off('add remove', this.render);
        this.filterViews = [];
      },

      // render the filter group
      render: function() {
        var html = filterGroupTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
        this.renderFilters();
      },

      // iterate over the filters with a render function
      renderFilters: function() {
        this.filtersViews = this.collection.map(this.renderFilter, this);
      },

      // render a single filter
      renderFilter: function(model) {
        var filterView = new FilterView({
          model: model,
          collection: this.collection
        });
        this.$el.children('ul')
                .append(filterView.$el);
        return filterView;
      }
    });

    // ### FilterView
    // render a single filter as part of a FilterGroupView
    FilterView = Backbone.View.extend({
      tagName: 'li',
      className: 'option',
      events: {
        'click .text': 'filterRequested'
      },
      initialize: function() {
        this.uniqueId = _.uniqueId();
        this.render();
      },
      // the user has clicked on the filter  
      // send the filter name and key to the event stream
      filterRequested: function(e) {
        console.log('filterRequested');
        var filter =  $(e.currentTarget).children()
                                        .data('filter');
        var field =  $(e.currentTarget).children()
                                        .data('key');
        searchBus.push({
          type: 'filter_event_' + this.model.get('type'),
          content: {
            filter: this.model
          }
        });
        this.destroy();
        this.collection.remove(this.model);
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = singleFilterTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      }
    });

    // ### SelectedFiltersView
    // Show a list of all selected filters
    // Allows users to remove these filters
    SelectedFiltersView = Backbone.View.extend({
      selectedFilterViews: [],
      // constructor
      // render the container, show the filters  
      // register listeners for add and remove events  
      initialize: function(options) {
        this.type = options.type;
        this.collection.on('add', this.render, this);
        this.collection.on('add', this.showFilters, this);
        this.collection.on('remove', this.shouldBeHidden, this);
        this.collection.on('remove', this.removeFilterView, this);
        this.render();
        this.shouldBeHidden();
      },

      // unhide the view
      // how ugly is this!!
      showFilters: function() {
        this.$el.children()
                .children()
                .children()
                .children()
                .removeClass('hidden');
      },
      removeFilterView: function(model) {
        model.trigger('remove_selected');
      },

      // check if the view should be hidden and hide if yes
      shouldBeHidden: function() {
        if (this.collection.size() === 0) {
        this.$el.children()
                .addClass('hidden');
        }
      },

      // destroy the view
      destroy: function() {
        this.$el.empty();
        this.undelegateEvents();
        this.collection.off('add', this.render);
        this.collection.off('add', this.showFilters);
        this.collection.off('remove', this.shouldBeHidden);
        this.collection.off('remove', this.removeFilterView);
      },

      // render the selected filters container
      render: function() {
        var html = selectedFiltersTmp({
          model: {
            type: this.type
          }
        });
        this.$el.empty()
                .append(html);
        this.renderFilters();
      },

      // iterate over the collection of filters
      renderFilters: function() {
        this.collection.each(this.renderFilter, this);
      },

      // render a single filter
      renderFilter: function(model, index, collection) {
        var selectedFilterView = new SelectedFilterView({
          model: model,
          collection: this.collection
        });
        this.selectedFilterViews.push(selectedFilterView);
        $('#' + this.type + '-selected-tags').append(selectedFilterView.$el);
      }
    });

    // ### SelectedFilterView
    // Used to display a filter that has been selected by a user  
    // Shown in the Current Filters section
    SelectedFilterView = Backbone.View.extend({
      tagName: 'li',
      className: 'tag',
      events: {
        'click .do-clear': 'removeFilter'
      },
      // constructor
      initialize: function() {
        this.render();
        this.model.on('remove_selected', this.destroy, this);
      },

      removeFilter: function() {
        searchBus.push({
          type: 'remove_filter',
          content: this.model
        });
        this.destroy();
      },

      // destroy the view
      destroy: function() {
        this.model.off('remove_selected');
        this.$el.remove();
        this.undelegateEvents();
        this.collection.remove(this.model);
      },

      // render a single filter
      render: function() {
        var html = selectedFilterTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      }
    });
    

    return {
      FilterView: FilterView,
      FilterGroupView: FilterGroupView,
      SelectedFiltersView: SelectedFiltersView
    };
  }
);
