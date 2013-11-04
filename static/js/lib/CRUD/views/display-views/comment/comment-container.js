/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a single comment
//

define (
  [
    'backbone', 'underscore', 'jquery',
    'lib/elements/views/CollectionViews',
    'lib/CRUD/data/CommentCollection',
    'lib/CRUD/templates/display-templates/misc/comment-container.tpl',
    'lib/CRUD/templates/display-templates/misc/comment.tpl'

  ],
  function (Backbone, _, $, CollectionViews, Comment, commentContainerTmp, commentTmp) {
    'use strict';

    var CommentListView,
        CommentView,
        CommentModel = Comment.CommentModel,
        ListView = CollectionViews.ListView,
        ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView;


    CommentView = ModelView.extend({
      template: commentTmp,
      className: 'comment-display'
    });

    // ### CommentContainerView
    // 
    CommentListView = ListLoadView.extend({
      modelType: CommentModel,
      childView: CommentView,
      childViews: [],
      fieldType: 'comments',
      className: 'comment-display-list',
      containerTmp: commentContainerTmp,

      initialize: function(options) {
        console.log(options.content);
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
      }

    });


    
    return CommentListView;
});



