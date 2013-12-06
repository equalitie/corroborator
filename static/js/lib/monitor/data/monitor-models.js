/*global Bootstrap*/
// Author: Cormac McGuire
// ### Description: define the models to be used in the monitor views
// 
define(
  ['backbone', 'underscore'],
  function (Backbone, _) {
  'use strict';

  var MonitorStatsModel, MonitorErrorModel, MonitorErrorCollection,
      ScraperConfigModel, ImporterConfigModel;
  var statsModel, scraperModel, importerModel;

  //## MonitorStatsModel
  // hold the stats for the job being monitored
  MonitorStatsModel = Backbone.Model.extend({
    initialize: function() {
    }
  });
  statsModel = new MonitorStatsModel(Bootstrap.importer_stats);



  //## MonitorErrorModel
  // hold generated errors
  MonitorErrorModel = Backbone.Model.extend({});

  MonitorErrorCollection = Backbone.Collection.extend({
    model: MonitorErrorModel
  });

  //## ScraperConfigModel
  // hold current scraper config
  ScraperConfigModel = Backbone.Model.extend({});
  scraperModel = new ScraperConfigModel(Bootstrap.scraper_conf);

  //## ScraperConfigModel
  // hold current importer config
  ImporterConfigModel = Backbone.Model.extend({});
  importerModel = new ImporterConfigModel(Bootstrap.importer_conf);

  
  return {
    scraperModel: scraperModel,
    importerModel: importerModel,
    statsModel: statsModel
  };
});
