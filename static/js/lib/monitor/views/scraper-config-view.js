/*global require*/
// Author: Cormac McGuire
// ### Description: Show the scraper config
// 
define(
  [
    'i18n!lib/monitor/nls/dict',
    'backbone',
    'lib/monitor/templates/scraper-config.tpl'
  ],
  function (i18n, Backbone, scraperTmp) {
  'use strict';

  // ###ScraperConfigView
  // show and edit the importer config
  return  Backbone.View.extend({
    className: 'scraper-container',
    template: scraperTmp,
    initialize: function (options) {
      this.render();
    },
    render: function() {
      var html = this.template({
        i18n: i18n
      });
      this.$el.html(html);
    }

  });

  
});

