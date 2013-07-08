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
        var html = bulletinFiltersTmp();
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

    // module export
    return {
      BulletinFilterView: BulletinFilterView
    };
});
