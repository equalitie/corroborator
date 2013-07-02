/*global define, Bacon */
/**
### filters.js

This displays the filter view
it provides:
- feedback on the number of actors selected
- filtering for the search results
- a menu to select/unselect all, create new, or update

*/
define(
  [
    // vendor
    'jquery', 'backbone', 'handlebars',
    // streams
    'lib/streams',
    // elements
    'lib/elements/combo',
    //data
    'lib/Data/collections',
    // templates
  ],

  function ($, Backbone, Handlebars, Streams, Combo, Collections) {
    //////////////////////////////////////////////////////////////////////
    // STREAM PROCESSING HELPERS
    //////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////
    // ACTOR FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    var ActorFilterView = Backbone.View.extend({
      initialize: function() {},
      render: function() {}

    });


    //////////////////////////////////////////////////////////////////////
    // BULLETIN FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    var BulletinFilterView = Backbone.View.extend({
      initialize: function() {},
      render: function() {}

    });


    //////////////////////////////////////////////////////////////////////
    // INCIDENT FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    var IncidentFilterView = Backbone.View.extend({
      initialize: function() {},
      render: function() {}

    });
});
