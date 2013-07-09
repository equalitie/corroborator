define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    // templates
    'lib/SolrSearch/templates/filter-group.tpl',
    'lib/SolrSearch/templates/single-filter.tpl',
    'lib/SolrSearch/templates/selected-filter.tpl'
  ],
  function (_, $, Backbone, filterGroupTmp, singleFilterTmp) {
    'use strict';
    var FilterGroupView,
        SelectedFilterView,
        FilterView;

    // ### FilterGroupView
    // Render a group of filters
    FilterGroupView = Backbone.View.extend({
      className: 'filter',
      filterViews: [],
      initialize: function() {
        this.render();
      },
      pluckFilters: function() {
        var attrs = this.model.toJSON();
        return _.omit(attrs, ['key', 'title']);
      },
      destroy: function() {
        _.each(this.filterViews, function(view) {
          view.destroy();
        });

      },
      render: function() {
        var html = filterGroupTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
        this.renderFilters();
      },
      renderFilters: function() {
        var filters = this.pluckFilters();
        _.each(filters, this.renderFilter, this);
      },
      renderFilter: function(numItems, filterName) {
        var model = new Backbone.Model({
          numItems: numItems,
          filterName: filterName
          });
        var filterView = new FilterView({model: model});
        this.$el.children('ul')
                .append(filterView.$el);
        this.filterViews.push(filterView);
      }
    });

    // ### FilterView
    // render a single filter as part of a FilterGroupView
    FilterView = Backbone.View.extend({
      tagName: 'li',
      className: 'option',
      events: {
        'click': 'filterRequested'
      },
      initialize: function() {
        this.render();
      },
      filterRequested: function() {
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
        var html = singleFilterTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      },
    });

    // ### SelectedFilterView
    // Used to display a filter that has been selected by a user  
    // Shown in the Current Filters section
    SelectedFilterView = Backbone.View.extend({
      initialize: function() {
      },
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },
      render: function() {
      }
    });
    

    return {
      FilterView: FilterView,
      FilterGroupView: FilterGroupView
    };
  }
);
