define(
  [
    'underscore',
    'lib/streams',
    'core/AbstractTextWidget'
  ],
  function(_, Streams) {
    var actorFields = [
          'age_en_exact',
          'sex_en_exact',
          'civilian_en_exact',
          'nationality_en_exact'
        ],
        bulletinFields = [
          'bulletin_labels_exact',
          'bulletin_assigned_exact',
          'most_recent_status_bulletin_exact',
          'sources_exact'
        ],
        incidentFields = [
          'incident_labels_exact', 
          'incident_assigned_exact',
          'crimes_exact',
          'most_recent_status_incident_exact'
        ],

        filterActors = function(element) {
          return element.django_ct.search(/actor/) > -1;
        },

        filterBulletin = function(element) {
          return element.django_ct.search(/bulletin/) > -1;
        },

        filterIncident = function(element) {
          return element.django_ct.search(/incident/) > -1;
        },

        // send the results off to the search bus
        pushActorResults = function(actors) {
          Streams.searchBus.push({
            type: 'results_actor',
            content: actors
          }); 
        },
        pushBulletinResults = function(bulletins) {
          Streams.searchBus.push({
            type: 'results_bulletin',
            content: bulletins
          }); 
        },
        pushIncidentResults = function(incidents) {
          Streams.searchBus.push({
            type: 'results_incident',
            content: incidents
          }); 
        };
    //////////////////////////////////////////////////////////////////////
    // AJAX SOLR SEARCH WIDGET
    //////////////////////////////////////////////////////////////////////

    var TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function () {
        
      },
      // send the results off the bus in a super functional way
      // cos that's how we do round here!
      //
      sendResults: function(searchResults) {
        
        pushActorResults(
          _.chain(searchResults)
           .filter(filterActors)
           .value()
        );

        pushBulletinResults(
          _.chain(searchResults)
           .filter(filterBulletin)
           .value()
        );
         
        pushIncidentResults(
          _.chain(searchResults)
           .filter(filterIncident)
           .value()
        );
      },
      sendFilters: function() {
      },

      afterRequest: function () {
        var searchResults = this.manager.response.response.docs;
        this.sendResults(searchResults);
      }
    });

    return TextWidget;

});

