var Manager;
(function ($) {
  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'https://sjac.rightscase.org/solr/'
    });
	Manager.addWidget(new AjaxSolr.TextWidget({
	  id: 'text',
	  target: '#docs',
	  fields: ['type','sources']
	}));

        Manager.addWidget(new AjaxSolr.CurrentFiltersWidget({

		id: 'currentfilters'
	}));
	var fields = [ 'bulletin_labels_exact', 'bulletin_status_exact','bulletin_assigned_exact','incident_labels_exact', 'incident_status_exact','incident_assigned_exact','crimes_exact','sources_exact','civilian_en_exact','age_en_exact','sex_en_exact','nationality_en_exact'];
	for( var i =0; i <fields.length;i++){
	Manager.addWidget(new AjaxSolr.labelsWidget({
		field: fields[i],
		id: fields[i]
	}));
	}
        Manager.addWidget(new AjaxSolr.EmbeddedSearchWidget({
          id: 'EmbeddedSearch',
          target: '#docs',
          fields: ['type','sources']
        }));


    Manager.init();
Manager.store.addByValue('q', 'django_ct:*incident');
    var params = {
      facet: true,
      'facet.sort':'count',
      'facet.field': [ 'bulletin_labels_exact', 'bulletin_status_exact','bulletin_assigned_exact','incident_labels_exact', 'incident_status_exact','incident_assigned_exact','crimes_exact','sources_exact','civilian_en_exact','age_en_exact','sex_en_exact','nationality_en_exact' ],
	'rows': 1000,
      'facet.limit': 1000,
      'facet.mincount': 1,
      'json.nl': 'map'
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
Manager.doRequest();
  });
})(jQuery);
/*
var ManagerEmbedded;
(function ($) {
  $(function () {
    ManagerEmbedded = new AjaxSolr.Manager({
      solrUrl: 'http://eq.rightscase.org:8983/solr/'
    });
        ManagerEmbedded.addWidget(new AjaxSolr.EmbeddedSearchWidget({
          id: 'EmbeddedSearch',
          target: '#docs',
          fields: ['type','sources']
        }));


    ManagerEmbedded.init();
  });
})(jQuery);*/
