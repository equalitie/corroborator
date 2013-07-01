define(
  [
    'jquery', 'underscore', 'backbone', 'handlebars',
    'lib/streams',
    'lib/Data/collections',
    'lib/SolrSearch/templates/actor.tpl',
    'lib/SolrSearch/templates/actor-results.tpl',
    'lib/SolrSearch/templates/bulletin.tpl',
    'lib/SolrSearch/templates/bulletin-results.tpl',
    'lib/SolrSearch/templates/incident.tpl',
    'lib/SolrSearch/templates/incident-results.tpl'
  ],
  function($, _, Backbone, Handlebars, Streams, Collections) {
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
        'click input[type="checkbox"]': 'selectActor'
      },
      initialize: function(options) {
        this.index = options.index;
        this.template = Handlebars.templates['actor.tpl'];
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.destroy, this);
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
        var html = this.template({
          model: this.model.toJSON(),
          pos:pos
        });
        this.$el.addClass('result');
        this.$el.append(html);
        return this;
      },
      destroy: function() {
        this.undelegateEvents();
        this.remove();
      }

    });

    // Show the results of a search for actors
    var ActorResultsView = Backbone.View.extend({
      el: '.body',
      childViews: [],
      initialize: function() {
        this.collection = Collections.ActorCollection;
        this.collection.on('add sort reset', this.render, this);
        this.template = Handlebars.templates['actor-results.tpl'];
        this.render();
      },

      //render container template
      render: function() {
        var html = this.template();
        this.$el.empty();
        this.$el.append(html);
        this.collection.each(this.renderList, this);
        return this;
      },

      // render each of our actor results
      renderList: function(model, index) {
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

      destroy: function() {
        _.each(this.childViews, function(view) {
          view.destroy();
        });
        this.undelegateEvents();
        this.remove();
      }
    });


    ///////////////////////////////////////////////////////////////////////////
    // ## INCIDENT LIST DISPLAY
    ///////////////////////////////////////////////////////////////////////////

    //render and individual result
    var IncidentResultView = Backbone.View.extend({
      events: {
      },
      initialize: function(options) {
        this.index = options.index;
        this.template = Handlebars.templates['incident.tpl'];
        this.render();
      },
      render: function() {
        var html = this.template({
          model: this.model.toJSON(),
        });
        this.$el.addClass('result');
        this.$el.append(html);
        return this;
      },
      destroy: function() {
        this.undelegateEvents();
        this.remove();
      }

    });

    // Show the results of a search for actors
    var IncidentResultsView = Backbone.View.extend({
      el: '.body',
      childViews: [],

      initialize: function() {
        this.collection = Collections.IncidentCollection;
        this.collection.on('add sort reset', this.render, this);
        this.template = Handlebars.templates['actor-results.tpl'];
        this.render();
      },

      render: function() {
        this.$el.empty();
        var html = this.template();
        this.$el.append(html);
        this.collection.each(this.renderList, this);
        return this;
      },

      renderList: function(model, index) {
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

      destroy: function() {
        _.each(this.childViews, function(view) {
          view.destroy();
        });
        this.undelegateEvents();
        this.remove();
      }

    });

    ///////////////////////////////////////////////////////////////////////////
    // ## BULLETIN LIST DISPLAY
    ///////////////////////////////////////////////////////////////////////////

    //render and individual result
    var BulletinResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click input[type="checkbox"]': 'selectBulletin'
      },

      initialize: function(options) {
        this.index = options.index;
        this.template = Handlebars.templates['bulletin.tpl'];
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.destroy, this);
        this.render();
      },
      selectBulletin: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },

      render: function() {
        var html = this.template({
          model: this.model.toJSON(),
        });
        this.$el.empty()
                .addClass('REPEAT Bulletin in-table')
                .append(html);
        return this;
      },

      destroy: function() {
        this.undelegateEvents();
        this.remove();
      }

    });

    // Show the results of a search for actors
    var BulletinResultsView = Backbone.View.extend({
      el: '.body',
      childViews: [],
      initialize: function() {
        this.collection = Collections.BulletinCollection;
        this.collection.on('add sort reset', this.render, this);
        this.template = Handlebars.templates['bulletin-results.tpl'];
        this.render();
      },

      render: function() {
        this.$el.empty();
        var html = this.template();
        this.$el.append(html);
        this.collection.each(this.renderList, this);
        return this;
      },
      renderList: function(model, index, list) {
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
      destroy: function() {
        _.each(this.childViews, function(view) {
          view.destroy();
        });
        this.undelegateEvents();
        this.remove();
      }

    });


    //////////////////////////////////////////////////////////////////////////
    // ## show/display results logic
    //////////////////////////////////////////////////////////////////////////
    
    var currentView;
    var destroy = function (view) {
      if (view !== undefined) {
        view.destroy();
      }
    };

    // show the actor search results view
    var showActors = function() {
      // destroy current view
      destroy(currentView);
      // show actor view
      var actorResultsView = new ActorResultsView();
    };
    var showBulletins = function() {
      // destroy current view
      destroy(currentView);
      // show actor view
      var bulletinsResultsView = new BulletinResultsView();
    };
    var showIncidents = function() {
      // destroy current view
      destroy(currentView);
      // show actor view
      var incidentResultsView = new IncidentResultsView();
    };

    var showCurrent = function(navValue) {
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
                                  //.onValue(showCurrent);
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
