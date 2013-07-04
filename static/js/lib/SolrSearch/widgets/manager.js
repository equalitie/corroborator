define(
  [
    'lib/SolrSearch/TextSearch',
    'managers/Manager.jquery',
    'core/ParameterStore'
  ], 
  function(TextSearch) {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://127.0.0.1:8983/solr/collection1/'
    });

	var fields = [ 
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
  ];

  Manager.addWidget(new TextSearch({
    id: 'EmbeddedSearch',
    target: '#docs',
    fields: ['type','sources']
  }));


  Manager.init();
  Manager.store.addByValue('q', 'django_ct:*');
  var params = {
    facet: true,
    'facet.sort':'count',
    'facet.field': [ 
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
    'rows': 1000,
    'facet.limit': 1000,
    'facet.mincount': 1,
    'json.nl': 'map'
  };
  _.each(params, function(item, index, list) {
    Manager.store.addByValue(index, item);
  });


  return Manager;
});
