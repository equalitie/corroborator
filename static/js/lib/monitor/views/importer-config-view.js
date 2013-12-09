/*global require*/
// Author: Cormac McGuire
// ### Description: Show the importer config
// 
define(
  [
    'i18n!lib/monitor/nls/dict',
    'backbone', 'jquery', 'underscore',
    'lib/monitor/data/monitor-models',
    'lib/elements/helpers/form-validate',
    'lib/monitor/templates/importer-config.tpl'
  ],
  function (i18n, Backbone, $, _, Models, Forms, importerTmp) {
  'use strict';

  var ImporterConfigView,
      importerModel = Models.importerModel,
      FormatterMixin = Forms;

  // ###ImporterConfigView
  // show and edit the importer config
  ImporterConfigView = Backbone.View.extend({
    entityType: 'importer',
    className: 'importer-container',
    template: importerTmp,
    events: {
      'click input[type=submit]': 'submitRequested'
    },
    initialize: function (options) {
      this.model = importerModel;
      this.render();
      this.listenTo(this, 'rendered', this.enableDateWidget);
    },
    enableDateWidget: function() {
      $('#next_job_time').datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss'
      });
    },
    onDestroy: function() {
      this.stopListening();
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
        i18n: i18n,
        model: this.model.toJSON()
      });
      this.$el.html(html);
      return this;
    }
  });
  _.extend(ImporterConfigView.prototype, FormatterMixin);

  return ImporterConfigView;

  
});
