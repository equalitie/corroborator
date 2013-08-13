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
        this.listenTo(this.model, 'change', this.updateView.bind(this));
        this.listenTo(this.model, 'sync', this.render.bind(this));
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.render();
      },


      // user clicked checkbox
      selectBulletin: function() {
        var checked = (this.model.get('checked') !== 'checked') ? 'checked' : '';
        this.model.set({checked: checked}, {silent: true});
        this.model.collection.trigger('change');
      },

      updateView: function(model) {
        if (_.isEqual(model.changed ,{checked: 'checked'})) {
          console.log(this.$el);
          this.$el.children('.is-selector')
                  .children('input[type=checkbox]')
                  .attr('checked', 'checked');
        }
        else {
          this.render();
        }
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

      childViews: [],
      className: 'results-body',
      template: bulletinResultsTmp,
      events: {
        'scroll': 'handleScroll'
      },
      initialize: function() {
        console.log(this.$el);
        this.collection = Collections.BulletinCollection;
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

      sortRequested: function() {
        this.renderStart();
        this.$el.scrollTop(0);
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

      renderStart: function() {
        this.destroyChildren();
        var renderInitial = this.collection.slice(0, 30);
        this.currentPage = 1;
        this.loadAfter = 10;
        _.each(renderInitial, this.renderItem, this);
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

