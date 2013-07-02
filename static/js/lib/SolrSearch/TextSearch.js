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
        };

    //////////////////////////////////////////////////////////////////////
    // AJAX SOLR SEARCH WIDGET
    //////////////////////////////////////////////////////////////////////
    var TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function () {
        
      },

      afterRequest: function () {
        console.log(this.manager.response);
        
        var searchResults = this.manager.response.response.docs;
        // pull the various 
        var actors = _.filter(searchResults, filterActors);
        Streams.searchBus.push({
          type: 'results_actor',
          content: actors
        }); 
        var bulletins = _.filter(searchResults, filterBulletin);
        Streams.searchBus.push({
          type: 'results_bulletin',
          content: bulletins
        }); 
        var incidents = _.filter(searchResults, filterIncident);
        Streams.searchBus.push({
          type: 'results_incident',
          content: incidents
        }); 
      }
    });

    return TextWidget;

});

