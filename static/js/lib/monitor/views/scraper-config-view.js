/*global require*/
// Author: Cormac McGuire
// ### Description: Show the scraper config
// 
define(
  [
    'i18n!lib/monitor/nls/dict',
    'backbone', 'jquery', 'underscore',
    'lib/monitor/data/monitor-models',
    'lib/elements/helpers/form-validate',
    'lib/monitor/templates/scraper-config.tpl'
  ],
  function (i18n, Backbone, $, _, Models, Forms, scraperTmp) {
  'use strict';
  var scraperModel = Models.scraperModel,
      ScraperConfigView,
      FormatterMixin = Forms;

  // ###ScraperConfigView
  // show and edit the importer config
  ScraperConfigView = Backbone.View.extend({
    className: 'scraper-container',
    entityType: 'scraper',
    template: scraperTmp,
    events: {
      'click input[type=submit]': 'submitRequested'
    },
    initialize: function (options) {
      this.model = scraperModel;
      this.render();
      this.listenTo(this, 'rendered', this.enableDateWidget);
    },
    onDestroy: function() {
      this.stopListening();
    },
    enableDateWidget: function() {
      $('#next_job_time').datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss'
      });
    },
    submitRequested: function(evt) {
      evt.preventDefault();
      var $submit = $(evt.target),
          passed = this.validateForm();
      if (passed) {
        $submit.val('Saving')
               .attr('enabled', 'false');
        this.model.saveConf(this.formContent());
      }
    },
    render: function() {
      var html = this.template({
        model: this.model.toJSON(),
        i18n: i18n
      });
      this.$el.html(html);
    }

  });

  _.extend(ScraperConfigView.prototype, FormatterMixin);
  return ScraperConfigView;

  
});

