/*global define*/
// Author: Cormac McGuire
// ### Description
// Display the incident results

define (
  [
    'backbone', 'underscore',
    'lib/Data/collections',
    'lib/SolrSearch/templates/incident.tpl',
    'lib/SolrSearch/templates/incident-results.tpl'
  ],
  function (Backbone, _, Collections, incidentTmp, incidentResultsTmp) {
    'use strict';
    var IncidentResultView, IncidentResultsView,
        IncidentCollection = Collections.IncidentCollection;

    IncidentResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click input[type="checkbox"]': 'selectIncident'
      },

      // constructor
      initialize: function(options) {
        this.addi18n();
        this.index = options.index;
        this.listenTo(this.model, 'change, sync', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },
      

      // select an incident - user has clicked the checkbox
      selectIncident: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },

      // render the incident
      render: function() {
        var html = incidentTmp({
          model: this.model.toJSON()
        });
        this.$el.addClass('result REPEAT Incident in-table');
        this.$el.html(html);
        return this;
      },
      onDestroy: function() {
        this.stopListening();
      }

    });

    // Show the results of a search for actors
    IncidentResultsView = Backbone.View.extend({
      //el: '.results-body',
      childViews: [],
      template: incidentResultsTmp,
      className: 'results-body',

      // constructor
      initialize: function() {
        this.collection = IncidentCollection;
        this.listenTo(this.collection, 'add sort reset', this.renderList.bind(this));
        this.render();
        this.renderList();
      },

      //render container template
      render: function() {
        this.$el.remove().unbind();
        var html = this.template();
        this.$el.html(html);
        return this;
      },

      // render each of our actor results
      renderList: function(model, index) {
        this.destroyChildren();
        this.collection.each(this.renderItem, this);
        return this;
      },

      // render a single incident
      renderItem: function(model, index, list) {
        var resultView = new IncidentResultView({
          model: model,
          index: index
        });
        this.$el.children()
                .children()
                .append(resultView.$el);
        this.childViews.push(resultView);
      },

      destroyChildren:function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
      },
      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      }

    });

    return IncidentResultsView;
});

