define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    'lib/streams',
    // templates
    'lib/SolrSearch/templates/filters/filter-group.tpl',
    'lib/SolrSearch/templates/filters/single-filter.tpl',
    'lib/SolrSearch/templates/filters/selected-filters.tpl',
    'lib/SolrSearch/templates/filters/selected-filter.tpl',
    'i18n!lib/SolrSearch/nls/dict'
  ],
  function (_, $, Backbone, Streams, filterGroupTmp, singleFilterTmp,
    selectedFiltersTmp, selectedFilterTmp, i18n
  ) {
    'use strict';
    var FilterGroupView,
        SelectedFilterView,
        SelectedFiltersView,
        FilterView,
        searchBus = Streams.searchBus,
        filterResetRequest,
        createFilterLoadContentFunction,
        createFilterLoadFunction;

    createFilterLoadContentFunction = function(filterName, key) {
      return function (value) {
        return value.content.get('filterName') === filterName && 
               value.content.get('key')        === key;
      };
    };

    createFilterLoadFunction = function(entityType) {
      return function (value) {
        return value.type === 'filter_event_unload_' + entityType;
      };
    };
    // ### FilterGroupView
    // Render a group of filters
    FilterGroupView = Backbone.View.extend({
      className: 'filter',
      childViews: [],
      // actor bulletin incident?
      type: '',

      // constructor
      initialize: function() {
        this.collection = this.model.get('collection');
        this.listenTo(this.collection, 'add', this.renderFilter.bind(this));
        this.listenTo(this.collection, 'remove', this.renderFilters.bind(this));
        this.render();
      },

      // destroy this view and it's subviews
      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      },

      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },

      // render the filter group
      render: function() {
        if (this.collection.length > 0) {
          var html = filterGroupTmp({
            i18n: i18n,
            model: this.model.toJSON()
          });
          this.$el.empty()
                  .append(html);
          this.renderFilters();
        }
      },

      // iterate over the filters with a render function
      renderFilters: function() {
        this.destroyChildren();
        this.childViews = this.collection.map(this.renderFilter, this);
      },

      // render a single filter
      renderFilter: function(model) {
        var filterView = new FilterView({
          model: model,
          collection: this.collection
        });
        //if (model.get('numItems') > 5) {
          this.$el.children('ul')
                  .append(filterView.$el);
        //}
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
        this.render();
        this.typeFilterFunction =
          createFilterLoadFunction(this.model.get('type'));
        this.contentFilter = createFilterLoadContentFunction(
          this.model.get('filterName'),
          this.model.get('key')
        );
        this.listenForExternalRequests();
      },


      listenForExternalRequests: function() {
        this.subscriber = 
          searchBus.toEventStream()
                   .filter(this.typeFilterFunction)
                   .filter(this.contentFilter)
                   .subscribe(this.externalFilterRequested.bind(this));
      },

      externalFilterRequested: function() {
        this.destroy();
      },

      onDestroy: function() {
        this.subscriber();
      },

      // the user has clicked on the filter  
      // send the filter name and key to the event stream
      filterRequested: function(e) {
        searchBus.push({
          type: 'filter_event_' + this.model.get('type'),
          content: {
            filter: this.model
          }
        });
        this.collection.remove(this.model);
        this.destroy();
      },

      // render the filter
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
        this.listenTo(this.collection, 'add', this.render.bind(this));
        this.listenTo(this.collection, 'reset', this.render.bind(this));
        this.listenTo(this.collection, 'add', this.showFilters.bind(this));
        this.listenTo(this.collection, 'remove',
          this.shouldBeHidden.bind(this));
        this.listenTo(this.collection, 'remove',
          this.removeFilterView.bind(this));
        this.render();
        this.shouldBeHidden();
      },
      
      // unhide the view
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
      onDestroy: function() {
        this.stopListening();
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
