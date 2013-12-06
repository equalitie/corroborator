/*global require, Bootstrap*/
// Author: Cormac McGuire
// ### Description: Router for the monitor application
// 

define(
  [
    'backbone', 'jquery',
    'lib/monitor/views/monitor-view',
    'lib/monitor/views/importer-config-view',
    'lib/monitor/views/scraper-config-view'
  ],
  function (Backbone, $,
  MonitorView, ImporterConfigView, ScraperConfigView) {
    'use strict';

    var MonitorRouter,
        views = {
          importer: ImporterConfigView,
          monitor : MonitorView,
          scraper : ScraperConfigView
        };

    // ### MonitorRouter router for the monitor app
    // switches between views
    MonitorRouter = Backbone.Router.extend({
      routes: {
        '': 'showMonitor',
        'tab/monitor': 'showMonitor',
        'tab/importer-config': 'showImporterConfig',
        'tab/scraper-config': 'showScraperConfig',
      },
      showMonitor: function() {
        this.applyClass('.is-monitor');
        this.navigateToView(views.monitor);
      },
      showImporterConfig: function() {
        this.applyClass('.is-importer-config');
        this.navigateToView(views.importer);
      },
      showScraperConfig: function() {
        this.applyClass('.is-scraper-config');
        this.navigateToView(views.scraper);
      },
      navigateToView: function(newView) {
        this.destroyCurrentView()
            .showNewView(newView);
      },
      applyClass: function (selectedClassName) {
        $(selectedClassName).addClass('active')
                            .siblings()
                            .removeClass('active');
      },
      destroyCurrentView: function() {
        this.currentView ? this.currentView.destroy() : null;
        return this;
      },
      showNewView: function(selectedTabView) {
        this.currentView = new selectedTabView();
        console.log(this.currentView);
        $('#monitor-content').append(this.currentView.$el);
      }

    });
    return MonitorRouter;
  
});
