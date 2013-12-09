/*global Bootstrap*/
// Author: Cormac McGuire
// ### Description: define the models to be used in the monitor views
// 
define(
  [
    'backbone', 'underscore', 'moment',
    'lib/elements/helpers/cookie'
  ],
  function (Backbone, _, moment, cookie) {
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
  ScraperConfigModel = Backbone.Model.extend({
    url: function() {
      return '/corroborator/monitoring/update/scraper/';
    },
    saveConf: function(formContent) {
      var scrapers = this.get('scrapers');
      _(scrapers).each(function(item) {
        item.enabled = formContent[item.site] === "true" ? true: false;
      });
      this.set('scrapers', scrapers);
      this.set('actor_dir', formContent.actor_dir);
      this.set('bulletin_dir', formContent.bulletin_dir);
      this.set('next_job_time', 
        moment(formContent.next_job_time, 'yy-mm-dd HH:mm:ss').format('X'));
      this.unset('conf_data');
      this.set('conf_data', JSON.stringify(this.toJSON()));
      this.save(this.attributes, {
        headers: {
          'X-CSRFToken': cookie
        }
      });
    }
  });
  scraperModel = new ScraperConfigModel(Bootstrap.scraper_conf);

  //## ScraperConfigModel
  // hold current importer config
  ImporterConfigModel = Backbone.Model.extend({
    url: function() {
      return '/corroborator/monitoring/update/importer_conf/';
    },
    saveConf: function(formContent) {
      var media_params;
      media_params = this.get('media_params');
      media_params.media_dir = formContent.media_dir;
      this.set('actors_dir', formContent.actors_dir);
      this.set('bullletins_dir', formContent.bullletins_dir);
      this.set('media_params', media_params);
      this.set('next_job_time', 
        moment(formContent.next_job_time, 'yy-mm-dd HH:mm:ss').format('X'));
      this.unset('conf_data');
      this.set('conf_data', JSON.stringify(this.toJSON()));
      this.save(this.attributes, {
        headers: {
          'X-CSRFToken': cookie
        }
      });
    }
  });
  importerModel = new ImporterConfigModel(Bootstrap.importer_conf);

  
  return {
    scraperModel: scraperModel,
    importerModel: importerModel,
    statsModel: statsModel
  };
});
