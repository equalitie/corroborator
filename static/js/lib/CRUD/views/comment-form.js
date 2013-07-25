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
    'lib/CRUD/templates/comment-container.tpl',
    'lib/CRUD/templates/comment-form.tpl',
    'lib/CRUD/templates/comment-display.tpl'
  ],
  function (Backbone, _, $,
    commentContainerTmp, commentFormTmp, commentDisplayTmp
    ) {
    'use strict';

    var CommentFormView,
        CommentContainerView,
        CommentDisplayView;

    // ### CommentContainerView
    // Hold the other two views
    CommentContainerView = Backbone.View.extend({
      //store a reference to our child views so we can destroy them
      childViews: [],

      template: commentContainerTmp,

      // constructor
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: entityType not set';
        }
        this.entityType = options.entityType;
        this.render()
            .renderChildren();
      },

      //destroy the view and it's children
      destroy: function() {
        _.invoke(this.childViews, 'destroy');
        this.childViews = [];
        this.$el.remove();
        this.undelegateEvents();
      },
      renderChildren: function() {
        var commentFormView = new CommentFormView({
          el: '.comment-form',
          entityType: this.entityType
        });
        return this;
      },

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
      formElClass: 'comment-field',
      childViews: [],
      events: {
        'click .do-addComment': 'addCommentRequested'
      },
      // constructor
      initialize: function(options) {
        if (options.entityType === undefined) {
          throw 'Exception: undefined entityType';
        }
        this.entityType = options.entityType;
        this.render();
      },

      // handle add user comment
      addCommentRequested: function(evt) {
        evt.preventDefault();
        console.log($('.' + this.formElClass).serializeArray());
      },

      // prepare the object for destruction
      destroy: function() {
        this.$el.remove();
        this.undelegateEvents();
      },

      // render the view
      render: function() {
        var html = this.template({
          entityType: this.entityType
        });
        this.$el.append(html);
        return this;
      }
    });
    
    return {
      CommentContainerView: CommentContainerView,
      CommentFormView: CommentFormView,
      CommentDisplayView: CommentDisplayView
    };
});
