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
        this.listenTo(this.model, 'change', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.listenTo(this.model, 'sync', this.render.bind(this));
        this.render();
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
        this.listenTo(this.collection, 'sort reset', this.renderList.bind(this));
        this.listenTo(this.collection, 'add', this.addItem.bind(this));
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

      addItem: function(model) {
        var debugOnce = _.once(function() {
          console.trace();
        });
        //debugOnce();
        //console.debug('addItem', model);
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
