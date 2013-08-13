/*global define*/
// Author: Cormac McGuire
// ### Description
// Show the bulletin results

define (
  [
    'backbone', 'underscore',
    'lib/Data/collections',
    'lib/SolrSearch/templates/bulletin.tpl',
    'lib/SolrSearch/templates/bulletin-results.tpl'
  ],
  function (Backbone, _, Collections, bulletinTmp, bulletinResultsTmp) {
    'use strict';

    var BulletinCollection = Collections.BulletinCollection,
        BulletinResultsView, BulletinResultView;

    //render an individual result
    BulletinResultView = Backbone.View.extend({
      tagName: 'tr',
      events: {
        'click input[type="checkbox"]': 'selectBulletin'
      },

      // constructor
      initialize: function(options) {
        this.addi18n();
        this.index = options.index;
        this.listenTo(this.model, 'change, sync', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },


      // user clicked checkbox
      selectBulletin: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },

      // render the bulletin
      render: function() {
        var html = bulletinTmp({
          model: this.model.toJSON()
        });
        this.$el.empty()
                .addClass('REPEAT Bulletin in-table')
                .append(html);
        return this;
      },

      // remove event listeners
      onDestroy: function() {
        this.stopListening();
      }

    });

    // Show the results of a search for actors
    BulletinResultsView = Backbone.View.extend({
      listElementHeight: 54,
      chunkSize: 25,
      startLoad: 10,

      childViews: [],
      className: 'results-body',
      template: bulletinResultsTmp,
      events: {
        'scroll': 'handleScroll'
      },
      initialize: function() {
        console.log(this.$el);
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

      handleScroll: function(evt) {
        //if (this.$el.scrollTop() > thisstartLoad * listElementHeight) {
        //}
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

    return BulletinResultsView;
});

