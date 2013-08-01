/**
 * Author: Cormac McGuire
 * results.js
 * Display the results for actors, bulletins and incidents
 */
define(
  [
    'jquery', 'underscore', 'backbone', 'handlebars',
    'lib/streams',
    'lib/Data/collections',
    'lib/elements/language',
    'lib/SolrSearch/templates/actor.tpl',
    'lib/SolrSearch/templates/actor-results.tpl',
    'lib/SolrSearch/templates/bulletin.tpl',
    'lib/SolrSearch/templates/bulletin-results.tpl',
    'lib/SolrSearch/templates/incident.tpl',
    'lib/SolrSearch/templates/incident-results.tpl'
  ],
  function($, _, Backbone, Handlebars, Streams, Collections, Language,
    actorTmp, actorResultsTmp, bulletinTmp, bulletinResultsTmp,
    incidentTmp, incidentResultsTmp
  ) {
    'use strict';
    var extractResults = function(value) {
      return value.content;
    };

    ///////////////////////////////////////////////////////////////////////////
    // ## ACTOR LIST DISPLAY
    ///////////////////////////////////////////////////////////////////////////

    //render an individual result
    var ActorResultView = Backbone.View.extend({
      tagName: 'li',
      events: {
        'click .actor-content': 'expandActor',
        'click .toggle lang:(ar)': 'showArabic',
        'click .toggle lang:(en)': 'showEnglish',
        'click input[type="checkbox"]': 'selectActor'
      },
      initialize: function(options) {
        this.index = options.index;
        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },
      expandActor: function() {
        this.$el.children()
                .children()
                .children()
                .children('.actor-long-summary, .actor-summary')
                .toggleClass('hidden');
      },
      selectActor: function(e) {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },
      render: function() {
        this.$el.empty();
        var pos = this.index % 2 === 1 ? 'right': 'left';
        var html = actorTmp({
          model: this.model.toJSON(),
          pos:pos
        });
        this.$el.addClass('result');
        this.$el.append(html);
        return this;
      },
      onDestroy: function() {
        console.log('onDestroy');
        this.model.stopListening();
      }

    });

    // Show the results of a search for actors
    var ActorResultsView = Backbone.View.extend({
      //el: '.results-body',
      template: actorResultsTmp,
      childViews: [],
      initialize: function() {
        this.collection = Collections.ActorCollection;
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
      renderItem: function(model, index) {
        var resultView = new ActorResultView({
          model: model,
          index: index
        });
        this.$el.children()
                .children()
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


    ///////////////////////////////////////////////////////////////////////////
    // ## INCIDENT LIST DISPLAY
    ///////////////////////////////////////////////////////////////////////////

    //render and individual result
    var IncidentResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click .toggle span': 'switchLanguage',
        'click input[type="checkbox"]': 'selectIncident'
      },
      initialize: function(options) {
        this.index = options.index;
        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },
      // dom event handlers
      switchLanguage: function(evt) {
        var clickedElement = evt.currentTarget,
            i18nElement = this.$el.children('td.is-description')
                              .children('a')
                              .children('div.i18n');
        Language.toggleLanguage(clickedElement, i18nElement);
      },
      selectIncident: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },
      render: function() {
        var html = incidentTmp({
          model: this.model.toJSON()
        });
        this.$el.addClass('result REPEAT Incident in-table');
        this.$el.empty()
                .append(html);
        return this;
      },
      onDestroy: function() {
        this.stopListening();
      }

    });

    // Show the results of a search for actors
    var IncidentResultsView = Backbone.View.extend({
      //el: '.results-body',
      childViews: [],
      template: incidentResultsTmp,

      initialize: function() {
        console.log(this.childViews.length);
        this.collection = Collections.IncidentCollection;
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
      renderItem: function(model, index, list) {
        var resultView = new IncidentResultView({
          model: model,
          index: index
        });
        this.$el.children()
                .children()
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

    ///////////////////////////////////////////////////////////////////////////
    // ## BULLETIN LIST DISPLAY
    ///////////////////////////////////////////////////////////////////////////

    //render and individual result
    var BulletinResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click .toggle span': 'switchLanguage',
        'click input[type="checkbox"]': 'selectBulletin'
      },

      initialize: function(options) {
        this.index = options.index;
        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },
      // dom event handlers
      switchLanguage: function(evt) {
        var clickedElement = evt.currentTarget,
            i18nElement = this.$el.children('td.is-description')
                              .children('a')
                              .children('div.i18n');
        Language.toggleLanguage(clickedElement, i18nElement);
      },
      selectBulletin: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },

      render: function() {
        var html = bulletinTmp({
          model: this.model.toJSON()
        });
        this.$el.empty()
                .addClass('REPEAT Bulletin in-table')
                .append(html);
        return this;
      },

      destroy: function() {
        this.stopListening();
      }

    });

    // Show the results of a search for actors
    var BulletinResultsView = Backbone.View.extend({
      //el: '.results-body',
      childViews: [],
      template: bulletinResultsTmp,
      initialize: function() {
        this.collection = Collections.BulletinCollection;
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
      renderItem: function(model, index, list) {
        var resultView = new BulletinResultView({
          model: model,
          index: index
        });
        this.$el.children()
                .children()
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


    //////////////////////////////////////////////////////////////////////////
    // ## show/display results logic
    //////////////////////////////////////////////////////////////////////////
    
    var currentView,
        displayCurrentView = function (view) {
          if (currentView !== undefined) {
            $('.results-body').append(currentView.$el);
          }
        },
      destroy = function (view) {
          if (view !== undefined) {
            view.destroy();
          }
        };

    // show the actor search results view
    var showActors = function() {
      // destroy current view
      destroy(currentView);
      // show actor view
      currentView = new ActorResultsView();
      displayCurrentView();
    };
    var showBulletins = function() {
      // destroy current view
      destroy(currentView);
      // show actor view
      currentView = new BulletinResultsView();
      displayCurrentView();
    };
    var showIncidents = function() {
      // destroy current view
      destroy(currentView);
      // show actor view
      currentView = new IncidentResultsView();
      displayCurrentView();
    };

    var displayInicidents = function() {};
    var displayBulletins = function() {};

    var actorClicked = function(value) { return value === 'actor'; };
    var incidentClicked = function(value) { return value === 'incident'; };
    var bulletinClicked = function(value) { return value === 'bulletin'; };

    //////////////////////////////////////////////////////////////////////////
    // ## init/destroy
    //////////////////////////////////////////////////////////////////////////
    var init = function () {
      // connect to the navStream to choose our initial result display
      var actorsSelected = Streams.navProperty
                                  .filter(actorClicked)
                                  .onValue(showActors);
                                  
      var incidentSelected = Streams.navProperty
                                    .filter(incidentClicked)
                                    .onValue(showIncidents);

      var bulletinSelected = Streams.navProperty
                                    .filter(bulletinClicked)
                                    .onValue(showBulletins);

    };

    return {
      init: init,
      destroy: destroy
    };

});
