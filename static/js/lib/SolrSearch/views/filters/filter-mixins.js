/*global define*/
// Author: Cormac McGuire
// ### Description
// This contains mixins for the filter view objects  
// The mixins are logic that is shared across all the views

define (
  [
    'underscore',
    'lib/SolrSearch/views/filters/filter-elements'
  ],
  function (_, FilterElements) {
    'use strict';

    // ### FilterViewMixin
    var FilterGroupView = FilterElements.FilterGroupView,
        FilterViewMixin = {
          
          filterGroupViews: [],
        
          // unset event handlers and destroy DOM elements
          destroy: function() {
            this.destroyFilterGroupViews();
            this.selectedFiltersView.destroy();
            this.selectedFiltersView = undefined;
            this.undelegateEvents();
            this.collection.off('reset', this.renderFilterGroups);
            this.$el.empty();
            this.$el.unbind();
          },
          
          // destroy the subviews
          destroyFilterGroupViews: function() {
            _.each(this.filterGroupViews, function(view) {
              view.destroy();
            });
            this.filterGroupViews = [];
          },


          // render the filters if they already exist
          renderExistingCollection: function() {
            if (this.collection.size() > 0) {
              this.renderFilterGroups();
            }
          },

          // render the filter groups
          renderFilterGroups: function() {
            this.destroyFilterGroupViews();
            this.filterGroupViews =
              this.collection.map(this.renderGroup, this);
          },

          // render a filter group
          renderGroup: function(model) {
            var filterGroupView = new FilterGroupView({
              model: model
            });
            // aaaaaaaaaaagh
            this.$el.children()
                    .children()
                    .children()
                    .children('.filter-groups')
                    .prepend(filterGroupView.$el);
            return filterGroupView;
          }
        };
    return {
      FilterViewMixin: FilterViewMixin
    };
});

