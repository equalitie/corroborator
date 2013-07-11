define(
  [
    // vendor
    'underscore', 'jquery', 'backbone',
    // streams
    'lib/streams',
    //data
    'lib/Data/collections',
    'lib/SolrSearch/data/filter-collections',
    // filter elements
    'lib/SolrSearch/views/filters/filter-elements',
    // templates
    'lib/SolrSearch/templates/bulletin-filters.tpl'
  ],
  function (_, $, Backbone, Streams, Collections, FilterCollection,
    FilterElements, bulletinFiltersTmp) {
    var BulletinFilterView,
        SelectedFiltersView = FilterElements.SelectedFiltersView,
        SelectedBulletinFilterCollection = 
          FilterCollection.SelectedBulletinFilterCollection,
        FilterGroupView = FilterElements.FilterGroupView;
    // ## Bulletin filter view
    // display a list of filters for bulletins
    BulletinFilterView = Backbone.View.extend({
      events: {
        'click button.do-create-bulletin': 'createBulletinPressed'
      },
      // store the sub views so we can get rid of them later
      filterGroupViews: [],

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.collection = FilterCollection.BulletinFilterCollection;
        this.collection.on('reset', this.render, this);
        this.createSelectedFiltersGroup();
        this.render();
      },
      // create bulletin clicked
      createBulletinPressed: function(e) {
        var createBulletinEvent = {
          content: {},
          type: 'create_bulletin'
        };
        Streams.searchBus.push(createBulletinEvent);
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
        var renderContainer = _.once(this.renderContainer, this);
        renderContainer(this);
        this.destroyFilterGroupViews();
        this.renderFilterGroups();
      },

      // render the container
      renderContainer: function(self) {
        var html = bulletinFiltersTmp();
        self.$el.empty()
                .append(html);
        self.selectedFiltersView.setElement('.selected-bulletin-filters');
      },

      // render the filter groups
      renderFilterGroups: function() {
        this.filterGroupViews = this.collection.map(this.renderGroup, this);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-bulletin-filters',
          collection: SelectedBulletinFilterCollection,
          type: 'bulletin'
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
      BulletinFilterView: BulletinFilterView
    };
});
