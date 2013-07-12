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
    // templates
    'lib/SolrSearch/templates/bulletin-filters.tpl'
  ],
  function (_, $, Backbone, Streams, Collections, FilterCollection,
    Mixins, FilterElements, bulletinFiltersTmp) {
    var BulletinFilterView,
        SelectedFiltersView = FilterElements.SelectedFiltersView,
        FilterViewMixin = Mixins.FilterViewMixin,
        SelectedBulletinFilterCollection = 
          FilterCollection.SelectedBulletinFilterCollection,
        FilterGroupView = FilterElements.FilterGroupView;
    // ## Bulletin filter view
    // display a list of filters for bulletins
    BulletinFilterView = Backbone.View.extend({
      el: '.right-filters',
      events: {
        'click button.do-create-bulletin': 'createBulletinPressed'
      },
      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.render();
        this.collection = FilterCollection.BulletinFilterCollection;
        this.renderExistingCollection();
        this.collection.on('reset', this.renderFilterGroups, this);
        this.createSelectedFiltersGroup();
      },
      // create bulletin clicked
      createBulletinPressed: function(e) {
        var createBulletinEvent = {
          content: {},
          type: 'create_bulletin'
        };
        Streams.searchBus.push(createBulletinEvent);
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
