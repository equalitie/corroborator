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
        FilterGroupView = FilterElements.FilterGroupView,
        IncidentFilterCollection = FilterCollection.IncidentFilterCollection,
        SelectedIncidentFilterCollection = 
          FilterCollection.SelectedIncidentFilterCollection,
        SelectedFiltersView = FilterElements.SelectedFiltersView;

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
        this.createSelectedFiltersGroup();
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
        var renderContainer = _.once(this.renderContainer, this);
        renderContainer(this);
        this.destroyFilterGroupViews();
        this.renderFilterGroups();
      },

      // render the container
      renderContainer: function(self) {
        var html = incidentFiltersTmp();
        self.$el.empty()
                .append(html);
        self.selectedFiltersView.setElement('.selected-incident-filters');
      },

      // render the filter groups
      renderFilterGroups: function() {
        this.filterGroupViews = this.collection.map(this.renderGroup, this);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-incident-filters',
          collection: SelectedIncidentFilterCollection,
          type: 'incident'
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

    return {
      IncidentFilterView: IncidentFilterView
    };
});
