define(
  [
    'lib/SolrSearch/solr/TextSearch',
    'lib/SolrSearch/solr/filter-widget',
    'managers/Manager.jquery',
    'core/ParameterStore'
  ], 
  function(TextSearch, FilterWidget) {
    var solrUrl = {
          solrUrl: Bootstrap.solr_url
        },
        MainManager,
        FilterManager,
        ActorManager,
        BulletinManager,
        IncidentManager,
        createFilterManager,
        createMainManager,

        // facet fields
        fields = [ 
          'bulletin_labels_exact',
          'bulletin_assigned_exact',
          'incident_labels_exact', 
          'incident_assigned_exact',
          'crimes_exact',
          'sources_exact',
          'civilian_en_exact',
          'age_en_exact',
          'sex_en_exact',
          'nationality_en_exact',
          'most_recent_status_bulletin_exact',
          'most_recent_status_incident_exact'
        ],

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
        addFilterSearchToManger = function(manager) {
          manager.addWidget(new FilterWidget.FilterWidget({
            id: 'FilterSearch',
            fields: ['type','sources']
          }));
        },

        // add the main text search widget to a passed in manager
        addTextSearchToManger = function(manager) {
          manager.addWidget(new TextSearch({
            id: 'MainSearch',
            fields: ['type','sources']
          }));
        };



    // create a manager object to manage the main search across all entities
    createMainManager = function() {
      var mainManager = new AjaxSolr.Manager(solrUrl);
      addTextSearchToManger(mainManager);
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
      addFilterSearchToManger(filterManager);
      filterManager.init();
      addValuesToManager(filterManager);
      return filterManager;
    };

    // create the manager objects
    MainManager = createMainManager();
    ActorManager = createFilterManager('actor');
    BulletinManager = createFilterManager('bulletin');
    IncidentManager = createFilterManager('incident');

    // module export
    return {
      MainManager: MainManager,
      ActorManager: ActorManager,
      BulletinManager: BulletinManager,
      IncidentManager: IncidentManager
    };
});
