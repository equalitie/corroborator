/*global define*/
// Author: Cormac McGuire
// ### Routing for the reporting application
// 

define(
  ['backbone', 'lib/reporting/streams'],
  function(Backbone, EventStream) {
    'use strict';
    var Router,
        routerInstance;

    Router = Backbone.Router.extend({
      routes: {
        'tab/:route': 'openReportPage'
      },
      openReportPage: function(page) {
        EventStream.push({
          type: 'route',
          content: {
            route: page
          }
        });
      }
    });

    return Router;
  
  }
);
