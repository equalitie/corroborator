var Manager;
var initialLoad= true;

var initialCurrentGlobal = 'Actors';
(function ($) {
  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'https://sjac.rightscase.org/solr/corrob_dev/'
    });
    Manager.addWidget(new AjaxSolr.CalendarWidget({
      id: 'calendar_incident',
      target: '#incident_date_filter',
      field: 'incident_times_exact'
    }));
    Manager.addWidget(new AjaxSolr.CalendarWidget({
      id: 'calendar_bulletin',
      target: '#bulletin_date_filter',
      field: 'bulletin_times_exact'
    }));
    Manager.addWidget(new AjaxSolr.TextWidget({
      id: 'text',
      target: '#docs',
      fields: ['type','sources']
    }));

	//var fields = [ 'bulletin_labels_exact', 'bulletin_status_exact','bulletin_assigned_exact','incident_labels_exact', 'incident_status_exact','incident_assigned_exact','crimes_exact','sources_exact','civilian_en_exact','age_en_exact','sex_en_exact','nationality_en_exact'];
	var fields = [ 'bulletin_labels_exact', 'bulletin_assigned_exact','incident_labels_exact', 'incident_assigned_exact','crimes_exact','sources_exact','civilian_en_exact','age_en_exact','sex_en_exact','nationality_en_exact','most_recent_status_bulletin_exact','most_recent_status_incident_exact'];
	for( var i =0; i <fields.length;i++){
	Manager.addWidget(new AjaxSolr.labelsWidget({
		field: fields[i],
		id: fields[i]
	}));
	}
        Manager.addWidget(new AjaxSolr.CurrentFiltersWidget({

		id: 'currentfilters'
	}));

        Manager.addWidget(new AjaxSolr.EmbeddedSearchWidget({
          id: 'EmbeddedSearch',
          target: '#docs',
          fields: ['type','sources']
        }));


    Manager.init();
Manager.store.addByValue('q', 'django_ct:*actor');
    var params = {
      facet: true,
      'facet.sort':'count',
      //'facet.field': [ 'bulletin_labels_exact', 'bulletin_status_exact','bulletin_assigned_exact','incident_labels_exact', 'incident_status_exact','incident_assigned_exact','crimes_exact','sources_exact','civilian_en_exact','age_en_exact','sex_en_exact','nationality_en_exact' ],
      'facet.field': [ 'bulletin_labels_exact','bulletin_assigned_exact','incident_labels_exact', 'incident_assigned_exact','crimes_exact','sources_exact','civilian_en_exact','age_en_exact','sex_en_exact','nationality_en_exact','most_recent_status_bulletin_exact','most_recent_status_incident_exact' ],
	'rows': 1000,
      'facet.limit': 1000,
      'facet.mincount': 1,
      'json.nl': 'map',
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
		Manager.store.addByValue('sort', 'actor_created');

Manager.doRequest();
  });
})(jQuery);
