/*global define, Bacon */
/**
### header.js

This displays the header view
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
    'lib/SolrSearch/templates/header.tpl',
    'lib/SolrSearch/templates/header-count.tpl'
  ],

  function ($, Backbone, Handlebars, Streams, Combo, Collections) {
    //////////////////////////////////////////////////////////////////////
    // ACTOR FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    var ActorFilterView = Backbone.View.extend({});


    //////////////////////////////////////////////////////////////////////
    // BULLETIN FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    var BulletinFilterView = Backbone.View.extend({});

    //////////////////////////////////////////////////////////////////////
    // INCIDENT FILTER VIEW
    //////////////////////////////////////////////////////////////////////
    var IncidentFilterView = Backbone.View.extend({});
});
