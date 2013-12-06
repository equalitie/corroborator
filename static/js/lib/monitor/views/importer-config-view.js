/*global require*/
// Author: Cormac McGuire
// ### Description: Show the importer config
// 
define(
  [
    'i18n!lib/monitor/nls/dict',
    'backbone',
    'lib/monitor/data/monitor-models',
    'lib/monitor/templates/importer-config.tpl'
  ],
  function (i18n, Backbone, Models, importerTmp) {
  'use strict';

  var importerModel = Models.importerModel;
  console.log(importerTmp);

  // ###ImporterConfigView
  // show and edit the importer config
  return  Backbone.View.extend({
    className: 'importer-container',
    template: importerTmp,
    initialize: function (options) {
      this.model = importerModel;
      this.render();
    },
    render: function() {
      var html = this.template({
        i18n: i18n,
        model: this.model.toJSON()
      });
      this.$el.html(html);
    }
  });

  
});
