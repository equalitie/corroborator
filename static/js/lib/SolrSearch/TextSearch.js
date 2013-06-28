define(
  [
    'underscore',
    'lib/streams',
    'core/AbstractTextWidget'
  ],
  function(_, Streams) {
    var filterActors = function(element) {
      return element.django_ct.search(/actor/) > -1;
    };

    var filterBulletin = function(element) {
      return element.django_ct.search(/bulletin/) > -1;
    };

    var filterIncident = function(element) {
      return element.django_ct.search(/incident/) > -1;
    };

    var TextWidget = AjaxSolr.AbstractTextWidget.extend({
      init: function () {
        
      },

      afterRequest: function () {
        
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
      }
    });

    return TextWidget;

});

