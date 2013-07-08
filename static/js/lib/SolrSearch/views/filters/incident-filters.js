define(
  [
    // vendor
    'underscore', 'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    //data
    'lib/SolrSearch/data/filter-collections',
    // filter elements
    'lib/SolrSearch/views/filters/filter-elements',
    // templates
    'lib/SolrSearch/templates/incident-filters.tpl',
  ],
  function (_, $, Backbone, Handlebars, Streams, FilterCollection,
    FilterElements, incidentFiltersTmp) {
    var IncidentFilterView,
        FilterGroupView = FilterElements.FilterGroupView;

    // ## Incident filter view
    // display a list of filters for incidents
    IncidentFilterView = Backbone.View.extend({
      events: {
        'click button.do-create-incident': 'createIncidentPressed'
      },
      // store the sub views so we can get rid of them later
      filterGroupViews: [],

      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.collection = FilterCollection.BulletinFilterCollection;
        this.collection.on('reset', this.render, this);
        this.render();
      },
      createIncidentPressed: function(e) {
        var createIncidentEvent = {
          content: {},
          type: 'create_incident'
        };
        Streams.searchBus.push(createIncidentEvent);
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
        var html = incidentFiltersTmp();
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
        //if (_.size(model.attributes > 2)) {
          var filterGroupView = new FilterGroupView({
            model: model
          });
          this.$el.append(filterGroupView.$el);
          this.filterGroupViews.push(filterGroupView);
        //}
      }
    });

    return {
      IncidentFilterView: IncidentFilterView
    };
});
