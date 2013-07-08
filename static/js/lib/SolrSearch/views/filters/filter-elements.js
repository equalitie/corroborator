define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    // templates
    'lib/SolrSearch/templates/filter-group.tpl',
    'lib/SolrSearch/templates/single-filter.tpl'
  ],
  function (_, $, Backbone, filterGroupTmp, singleFilterTmp) {
    'use strict';
    var FilterGroupView,
        FilterView;

    // ### FilterGroupView
    // Render a group of filters
    FilterGroupView = Backbone.View.extend({
      className: 'filter',
      initialize: function() {
        this.render();
      },
      pluckFilters: function() {
        var attrs = this.model.toJSON();
        return _.omit(attrs, ['key', 'title']);
      },
      destroy: function() {
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
      render: function() {
        var html = singleFilterTmp({model: this.model.toJSON()});
        this.$el.empty()
                .append(html);
      },
    });

    return {
      FilterView: FilterView,
      FilterGroupView: FilterGroupView
    };
  }
);
