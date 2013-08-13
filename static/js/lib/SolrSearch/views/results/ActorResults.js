/*global define*/
// Author: Cormac McGuire
// ### Description
// display a list of actor results

define (
  [
   'backbone', 'underscore',
    'lib/Data/collections',
    'lib/SolrSearch/templates/actor.tpl',
    'lib/SolrSearch/templates/actor-results.tpl'
  ],
  function (Backbone, _, Collections, actorTmp, actorResultsTmp) {
    'use strict';

    var ActorResultsView, ActorResultView;


    ActorResultView = Backbone.View.extend({
      tagName: 'li',
      events: {
        //'click .actor-content': 'expandActor',
        'click .toggle lang:(ar)': 'showArabic',
        'click .toggle lang:(en)': 'showEnglish',
        'click input[type="checkbox"]': 'selectActor'
      },

      // constructor
      initialize: function(options) {
        this.index = options.index;
        this.listenTo(this.model, 'change', this.updateView.bind(this));
        this.listenTo(this.model, 'sync', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },

      updateView: function(model) {
        if (_.isEqual(model.changed ,{checked: 'checked'})) {
          console.log(this.$el);
          this.$el.children()
                  .children('.is-selector')
                  .children('input[type=checkbox]')
                  .attr('checked', 'checked');
        }
        else {
          this.render();
        }
      },

      // show longer version in list ( disabled )
      expandActor: function() {
        this.$el.children()
                .children()
                .children()
                .children('.actor-long-summary, .actor-summary')
                .toggleClass('hidden');
      },

      // check the checkbox
      selectActor: function(e) {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },

      // render a single actor
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
        this.model.stopListening();
      }

    });

    // Show the results of a search for actors
    ActorResultsView = Backbone.View.extend({
      //el: '.results-body',
      className: 'results-body',

      template: actorResultsTmp,
      childViews: [],
      initialize: function() {
        this.addi18n();
        this.collection = Collections.ActorCollection;
        this.listenTo(this.collection, 'add', this.renderItem.bind(this));
        this.listenTo(this.collection, 'sort', this.sortRequested.bind(this));
        this.listenTo(this.collection, 'reset', this.renderStart.bind(this));
        this.render();
        this.renderStart();
      },

      //render container template
      render: function() {
        this.$el.remove().unbind();
        var html = this.template();
        this.$el.html(html);
        return this;
      },

      chunkSize: 30,
      loadAfter: 10,
      currentPage: 0,
      handleScroll: function(evt) {
        var currentPosition, nextLoad, slice, start, end;
        currentPosition = this.$el.scrollTop();
        if (currentPosition > this.loadAfter * this.listElementHeight) {
          this.loadAfter = this.loadAfter + this.chunkSize;
          start = this.currentPage * this.chunkSize;
          end   = start + this.chunkSize;
          slice = this.collection.slice(start, end);
          _.each(slice, this.renderItem, this);
        }
      },
      
      sortRequested: function() {
        this.renderStart();
        this.$el.scrollTop(0);
      },

      renderStart: function() {
        this.destroyChildren();
        var renderInitial = this.collection.slice(0, 30);
        this.currentPage = 1;
        this.loadAfter = 10;
        _.each(renderInitial, this.renderItem, this);
      },

      // render a single actor result
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

    return ActorResultsView;

});