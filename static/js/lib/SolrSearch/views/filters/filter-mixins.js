/*global define*/
// Author: Cormac McGuire
// ### Description
// This contains mixins for the filter view objects  
// The mixins are logic that is shared across all the views

define (
  [
    'underscore', 'backbone',
    'lib/SolrSearch/views/filters/filter-elements'
  ],
  function (_, Backbone, FilterElements) {
    'use strict';

    // ### FilterViewMixin
    var FilterGroupView = FilterElements.FilterGroupView,
        DropDownFilterGroupView = FilterElements.DropDownFilterGroupView,
        FilterViewMixin = {
          
        
          // unset event handlers and destroy DOM elements
          destroy: function() {
            this.destroyFilterGroupViews();
            this.selectedFiltersView.destroy();
            this.selectedFiltersView = undefined;
            this.undelegateEvents();
            this.stopListening();
            this.$el.empty();
            this.$el.unbind();
          },
          
          // destroy the subviews
          destroyFilterGroupViews: function() {
            _.invoke(this.filterGroupViews, 'destroy');
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

          // render a filter group, a drop down selector if the group is
          // greater than 10 elements long
          renderGroup: function(model) {
            var filterGroupView = model.get('collection').length > 10 ?
              new DropDownFilterGroupView({ model: model }) :
              new FilterGroupView({ model: model });
            this.$el.children()
                    .children()
                    .children()
                    .children('.filter-groups')
                    .prepend(filterGroupView.$el);
            filterGroupView.trigger('appended');
            return filterGroupView;
          }
        };
    return {
      FilterViewMixin: FilterViewMixin
    };
});

