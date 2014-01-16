define(
  [
    'lib/SolrSearch/solr/facet-fields',
    'lib/SolrSearch/solr/reporting-widget',
    'lib/SolrSearch/solr/filter-widget',
    'lib/SolrSearch/solr/embedded-search-widget',
    'lib/streams',
    'managers/Manager.jquery',
    'core/ParameterStore'
  ], 
  function(FacetFields, ReportingWidget, FilterWidget, EmbeddedSearchWidget,
    Streams) {
    var solrUrl = {
          solrUrl: Bootstrap.solr_url
        },
        crudBus = Streams.crudBus,
        searchBus = Streams.searchBus,
        MainManager,
        FilterManager,
        createFilterManager,
        createMainManager,

        // facet fields
        fields = FacetFields,

        // search parameters
        params = {
          facet: true,
          'facet.sort':'count',
          'facet.field': fields,
          'rows': 1000,
          'facet.limit': 1000,
          'facet.mincount': 1,
          'json.nl': 'map'
        },

        // define our search paramaters
        addValuesToManager = function(manager) {
          manager.store.addByValue('q', 'django_ct:*');
          _.each(params, function(item, index, list) {
            manager.store.addByValue(index, item);
          });
        },

        // add the filtered search widget to a passed in manager
        addReportWidgetToManager = function(manager) {
          manager.addWidget(new FilterWidget.FilterWidget({
            id: 'FilterSearch',
            fields: ['type','sources']
          }));
        },

        // add the main text search widget to a passed in manager
        addReportingWidgetToManager = function(manager) {
          manager.addWidget(new ReportingWidget({
            id: 'MainSearch',
            bus: searchBus,
            shouldSendFilters: true,
            fields: ['type','sources']
          }));
        };



    // create a manager object to load the filters for our three entities
    createMainManager = function() {
      var mainManager = new AjaxSolr.Manager(solrUrl);
      addReportingWidgetToManager(mainManager);
      mainManager.init();
      addValuesToManager(mainManager);
      return mainManager;
    };

    // create the filtered search for one entity  
    // this will need to listen for filters sent to the main search also
    // because we want to perform sub filtering here
    createFilterManager = function(entity) {
      var filterManager = new AjaxSolr.Manager(solrUrl);
      filterManager.entity = entity;
      addReportWidgetToManager(filterManager);
      filterManager.init();
      addValuesToManager(filterManager);
      return filterManager;
    };

    // create the manager objects
    MainManager           = createMainManager();
    FilterManager         = createFilterManager();

    // module export
    return {
      MainManager          : MainManager
    };
});
