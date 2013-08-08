/*global window, document, define */
define(
  [
    'lib/Navigation/main',
    'lib/SolrSearch/main',
    'lib/CRUD/main',
    'jquery', 'underscore',
    'lib/streams',
    'lib/elements/helpers/date-helper',
    'lib/elements/helpers/ie-fixes',
    'lib/elements/helpers/view-close',
    'jquery_ui',
    'jquery_form',
    'jquery_time',
    'jquery_slider'
  ],
  function(Navigation, SolrSearch, CRUD, $, _, Streams) {
    'use strict';
    var actorsLoaded = false,
        bulletinsLoaded = false,
        incidentsLoaded = false,
        searchBus = Streams.searchBus,
        unsub,
        postSearchInit = function() {
          unsub();
          CRUD.init();
          Navigation.init();
        },
        initialize = _.once(postSearchInit),
        loadComplete = function(value) {
          if (value.type === 'results_actor') {
            actorsLoaded = true;
          }
          if (value.type === 'results_incident') {
            incidentsLoaded = true;
          }
          if (value.type === 'results_bulletin') {
            bulletinsLoaded = true;
          }
          return actorsLoaded && incidentsLoaded && bulletinsLoaded;
        };
        
    unsub = searchBus.toProperty()
                     .filter(loadComplete)
                     .subscribe(postSearchInit);
    SolrSearch.init();
  }
);

