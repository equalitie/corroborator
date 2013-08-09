/*global define*/
// Author: Cormac McGuire
// ### Description
// Define list views that can be reused to display collections

define (
  [
    'backbone', 'underscore'
  ],
  function (Backbone, _) {
    'use strict';
    var ListView, ListLoadView, ModelView, ListPrototype, ListLoadPrototype;

    ListPrototype = {
      template: undefined,
      templateVars: {
      },
      destroy: function() {
        this.$el.removeData().unbind();
        this.remove();
        this.undelegateEvents();
        this.destroyChildren();
        this.stopListening();
        if (this.onDestroy) {
          this.onDestroy();
        }
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
      },
      render: function () {
        var html = this.containerTmp(this.templateVars);
        this.$el.html(html);
      },
      renderChildren: function() {
        var html = this.containerTmp(this.templateVars);
        this.destroyChildren();
        this.collection.each(this.renderChild, this);
      },
      renderChild: function (model) {
        var childView = new this.childView({model: model});
        this.childViews.push(childView);
        this.$el.children('.' + this.fieldType + '-list')
                .append(childView.el);
      }

    };

    ListView = Backbone.View.extend();
    _.extend(ListView.prototype, ListPrototype);

    ListLoadPrototype = {
      
      loadFromList: function(list) {
        this.collection = new Backbone.Collection();
        this.listenTo(this.collection, 'sync', this.renderChildren.bind(this));
        _.each(list, this.loadExistingContent, this);
      },
      loadExistingContent: function(resourceUri) {
        var initialModel = new this.modelType({
          resourceUri: resourceUri
        });
        this.collection.add(initialModel);
      }
    };

    ListLoadView = Backbone.View.extend();
    _.extend(ListLoadView.prototype, ListLoadPrototype);
    _.extend(ListLoadView.prototype, ListPrototype);

    ModelView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },

      render: function() {
        var html = this.template({model: this.model.toJSON()});
        this.$el.html(html);
      }
    });

    return {
      ListView: ListView,
      ModelView: ModelView,
      ListLoadView: ListLoadView
    };
});

