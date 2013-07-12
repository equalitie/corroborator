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
    'lib/SolrSearch/views/filters/filter-mixins',
    // templates
    'lib/SolrSearch/templates/incident-filters.tpl',
  ],
  function (_, $, Backbone, Handlebars, Streams, FilterCollection,
    FilterElements, Mixins, incidentFiltersTmp) {
    var IncidentFilterView,
        FilterGroupView = FilterElements.FilterGroupView,
        FilterViewMixin = Mixins.FilterViewMixin,
        IncidentFilterCollection = FilterCollection.IncidentFilterCollection,
        SelectedIncidentFilterCollection = 
          FilterCollection.SelectedIncidentFilterCollection,
        SelectedFiltersView = FilterElements.SelectedFiltersView;

    // ## Incident filter view
    // display a list of filters for incidents
    IncidentFilterView = Backbone.View.extend({
      el: '.right-filters',
      events: {
        'click button.do-create-incident': 'createIncidentPressed'
      },
      // constructor - listen for collection reset event and render the view
      initialize: function() {
        this.render();
        this.collection = IncidentFilterCollection;
        this.renderExistingCollection();
        this.collection.on('reset', this.renderFilterGroups, this);
        this.createSelectedFiltersGroup();
      },
      createIncidentPressed: function(e) {
        var createIncidentEvent = {
          content: {},
          type: 'create_incident'
        };
        Streams.searchBus.push(createIncidentEvent);
      },

      // render the container
      render: function() {
        var html = incidentFiltersTmp();
        this.$el.empty()
                .append(html);
      },

      // create the view that will display the users selected filters
      createSelectedFiltersGroup: function() {
        this.selectedFiltersView = new SelectedFiltersView({
          el: '.selected-incident-filters',
          collection: SelectedIncidentFilterCollection,
          type: 'incident'
        });

      }

    });
    _.extend(IncidentFilterView.prototype, FilterViewMixin);

    return {
      IncidentFilterView: IncidentFilterView
    };
});
