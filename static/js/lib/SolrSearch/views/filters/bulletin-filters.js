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
    'lib/SolrSearch/views/filters/filter-mixins',
    'lib/SolrSearch/views/filters/filter-elements',
    'lib/SolrSearch/views/filters/date-range',
    // templates
    'lib/SolrSearch/templates/bulletin-filters.tpl'
  ],
  function (_, $, Backbone, Streams, Collections, FilterCollection,
    Mixins, FilterElements, DateRange, bulletinFiltersTmp) {
    var BulletinFilterView,
        DateRangeView = DateRange.DateRangeView,
        SelectedFiltersView = FilterElements.SelectedFiltersView,
        FilterViewMixin = Mixins.FilterViewMixin,
        SelectedBulletinFilterCollection = 
          FilterCollection.SelectedBulletinFilterCollection,
        FilterGroupView = FilterElements.FilterGroupView;
    // ## Bulletin filter view
    // display a list of filters for bulletins
    BulletinFilterView = Backbone.View.extend({
      el: '.right-filters',
      filterGroupViews: [],
      events: {
        'click button.do-create-bulletin': 'createBulletinPressed'
      },
      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.render();
        this.collection = FilterCollection.BulletinFilterCollection;
        this.renderExistingCollection();
        this.listenTo(this.collection, 'reset', this.renderFilterGroups.bind(this));
        this.createSelectedFiltersGroup();
        this.createDateRangeWidget();
      },

      // create bulletin clicked
      createBulletinPressed: function(e) {
        var createBulletinEvent = {
          content: {},
          type: 'create_bulletin'
        };
        Streams.searchBus.push(createBulletinEvent);
      },

      createDateRangeWidget: function() {
        this.dateRangeView = new DateRangeView({
          el: '.date-range',
          entityType: 'bulletin',
          title: 'Bulletin created between'
        });
      },

      // render the container
      render: function() {
        var html = bulletinFiltersTmp();
        this.$el.empty()
                .append(html);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-bulletin-filters',
          collection: SelectedBulletinFilterCollection,
          type: 'bulletin'
        });

      }

    });
    _.extend(BulletinFilterView.prototype, FilterViewMixin);

    // module export
    return {
      BulletinFilterView: BulletinFilterView
    };
});
