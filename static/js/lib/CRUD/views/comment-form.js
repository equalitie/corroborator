/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a form to add comments to the database and expose and input field
// with added comments to be saved to the records it is related to
// Composed of three views CommentContainerView holds CommentFormView and 
// CommentDisplayView
define (
  [
    'backbone', 'underscore', 'jquery',
    'lib/elements/select-option',
    'lib/CRUD/views/form-mixins',
    'lib/CRUD/data/CommentCollection',
    'lib/CRUD/templates/search-templates/comment-container.tpl',
    'lib/CRUD/templates/search-templates/comment-form.tpl',
    'lib/CRUD/templates/search-templates/comment-display.tpl'
  ],
  function (Backbone, _, $, SelectOptionView, Mixins, CommentData,
    commentContainerTmp, commentFormTmp, commentDisplayTmp
    ) {
    'use strict';

    var CommentFormView,
        CommentContainerView,
        CommentDisplayView,
        CommentsDisplayView,
        Formatter         = Mixins.Formatter,
        WidgetMixin       = Mixins.WidgetMixin,
        CommentModel      = CommentData.CommentModel,
        CommentCollection = CommentData.CommentCollection,
        mapResourceUriToId = function(resourceUri) {
          return {id :_.last(resourceUri.match(/\/(\d+)\/$/))};
        };

    // ### CommentContainerView
    // Hold the other two views
    CommentContainerView = Backbone.View.extend({
      //store a reference to our child views so we can destroy them
      childViews: [],
      selectViews: [],

      template: commentContainerTmp,

      // constructor
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: entityType not set';
        }
        var content = _.map(options.content, mapResourceUriToId);
        this.collection = new CommentCollection(content);
        this.entityType = options.entityType;
        this.render()
            .renderChildren();
        this.collection.on('sync', this.renderSelectOptions, this);
      },

      //destroy the view and it's children
      destroy: function() {
        this.destroyChildViews();
        this.destroySelectViews();
        this.$el.remove();
        this.undelegateEvents();
      },
      destroyChildViews: function() {
        _.invoke(this.childViews, 'destroy');
      },
      destroySelectViews: function() {
        _.invoke(this.selectViews, 'destroy');
      },

      // render all child display elements
      renderChildren: function() {
        this.renderForm()
            .renderComments()
            .renderSelectOptions();
      },

      // render the comment input form
      renderForm: function() {
        var commentFormView = new CommentFormView({
          el: '.comment-form',
          collection: this.collection,
          entityType: this.entityType
        });
        this.childViews.push(commentFormView);
        return this;
      },

      // render the comment display
      renderComments: function() {
        var commentsDisplayView = new CommentsDisplayView({
          el: this.$el.children('ul.comments'),
          collection: this.collection
        });
        this.childViews.push(commentsDisplayView);
        return this;
      },

      // render the multiple select box 
      renderSelectOptions: function() {
        this.destroySelectViews();
        this.collection.each(this.addToSelectList, this);
        return this;
      },

      // add a selected option to the hidden select element
      addToSelectList: function(model) {
        var selectOptionView = new SelectOptionView({
          model: model
        });
        this.$el.children('select')
                .append(selectOptionView.$el);
        this.selectViews.push(selectOptionView);
      },

      // render the container
      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
        return this;
      }
    });
    
    // ### CommentFormView
    // Display the comment form
    CommentFormView = Backbone.View.extend({
      //set the template
      template: commentFormTmp,

      entityType: 'comment',
      childViews: [],
      events: {
        'click .do-addComment': 'addCommentRequested'
      },

      // constructor
      initialize: function(options) {
        this.collection.on('edit', this.populateForm, this);
        //this.entityType = options.entityType;
        this.render();
      },

      // handle add user comment
      addCommentRequested: function(evt) {
        evt.preventDefault();
        if (this.model === undefined) { // new comment
          var formContent = this.formContent();
          var comment = new CommentModel(this.formContent());
          comment.save();
          this.collection.add(comment);
        }
        else { // update existing comment
          this.model.set(this.formContent());
          this.model.save();
          this.model = undefined;
        }
        this.clearForm();
      },

      populateForm: function(model) {
        this.model = model;
        this.render();
        this.$el.children()
                .children('textarea')
                .val(model.get('comment_en'));
        //todo set selected values
        //this.$el.children()
                //.children('select')
                //.children('option[value=' + model.get('bulletin_status')
      },
      clearForm: function() {
        this.$el.children()
                .children('textarea')
                .val('');
        this.$el.children()
                .children('select :nth-child(0)')
                .prop('selected', true);
      },

      // prepare the object for destruction
      destroy: function() {
        this.$el.remove();
        this.disableWidgets();
        this.undelegateEvents();
      },

      // render the view
      render: function() {
        var html = this.template({
          entityType: this.entityType,
          model: this.model
        });
        this.$el.empty()
                .append(html);
        return this;
      }
    });
    _.extend(CommentFormView.prototype, WidgetMixin);
    _.extend(CommentFormView.prototype, Formatter);
    
    // ### CommentsDisplayView
    // 
    CommentsDisplayView = Backbone.View.extend({
      childViews: [],
      initialize: function() {
        this.collection.on('add remove change', this.render, this);
        this.render();
      },
      destroy: function() {
        this.destroyChildren();
        this.collection.off('add remove change', this.render, this);
        this.$el.remove();
        this.undelegateEvents();
      },
      destroyChildren: function() {
        _.invoke(this.childViews, 'destroy');
      },
      render: function() {
        this.destroyChildren();
        this.collection.each(function(model) {
          var commentView = new CommentDisplayView({
            model: model,
            collection: this.collection
          });
          this.$el.prepend(commentView.$el);
          this.childViews.push(commentView);
        }, this);
      }
    });

    // ### CommentDisplayView
    // display a single comment, handle edit/remove events
    CommentDisplayView = Backbone.View.extend({
      // define a template
      template: commentDisplayTmp,
      tagName: 'li',
      className: 'comment',
      // define event handlers
      events: {
        'click .do-edit-comment': 'editComment',
        'click .do-remove': 'removeComment',
      },
      // constructor - render the view
      initialize: function() {
        this.render();
      },
      // edit comment clicked - trigger an edit event on the model
      // and send the model with it
      editComment: function(evt) {
        evt.preventDefault();
        this.collection.trigger('edit', this.model);
      },
      // remove comment clicked, delete the model and destroy 
      // this view
      removeComment: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        this.model.destroy();
        this.destroy();
      },

      // render the comment
      render: function(evt) {
        var html = this.template({model: this.model.toJSON()});
        this.$el.empty().append(html);
      }
    });
    
    
    return {
      CommentContainerView: CommentContainerView,
      CommentFormView: CommentFormView,
      CommentDisplayView: CommentDisplayView
    };
});
