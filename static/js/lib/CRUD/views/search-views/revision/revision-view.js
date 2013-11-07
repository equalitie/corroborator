/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description: 
// Display the revisions for this entity

define(
  [
    'backbone', 'underscore', 'jquery', 'moment',
    'lib/CRUD/data/CommentCollection',
    'lib/CRUD/templates/search-templates/revision/revision-container.tpl',
    'i18n!lib/CRUD/nls/dict'
  ],
  function (Backbone, _, $, moment, Comment, revisionContainerTmp, i18n) {
  'use strict';
  
  var RevisionView,
      CommentCollection = Comment.CommentCollection;

  var statusLabel = function(statusResourceUri, created_date) {
    var dateFormat, status;
    dateFormat = "MMM Do, YYYY";
    status = _.chain(Bootstrap.comment_statuses)
              .where({resource_uri: statusResourceUri})
              .first()
              .value();
    return status.comment_status + ' - ' + moment(created_date).format(dateFormat);
  };
  // ###RevisionView
  // Display the Revisions for an entity
  // accepts a collection of revisions
  RevisionView = Backbone.View.extend({
    events: {
      'click li'    : 'revisionViewRequest',
      'click button': 'toggleVisibleList',
      'click p'     : 'toggleVisibleList',
    },
    template: revisionContainerTmp,
    fetchedTotal: 0,
    initialize: function (options) {
      var comments = _.map(options.content, function(commentResourceUri) {
        return {resourceUri: commentResourceUri};
      });
      this.collection = new CommentCollection(comments);
      this.listenTo(this.collection, 'change', this.modelFetched.bind(this));
    },
    onDestroy: function() {
      this.stopListening();
    },
    revisionViewRequest: function(evt) {
      this.updateDisplayContent($(evt.currentTarget).index());
      this.toggleVisibleList();
    },
    listVisibilityStatus: function() {
      return this.$el.children()
                 .children()
                 .children('ul')
                 .hasClass('hidden');
    },
    toggleVisibleList: function() {
      var $ul = this.$el.children()
                .children()
                .children('ul');
      if (this.listVisibilityStatus()) {
        $ul.removeClass('hidden');
      }
      else {
        $ul.addClass('hidden');
      }
    },
    modelFetched: function(model) {
      this.fetchedTotal =  this.fetchedTotal + 1;
      model.set(
        'status_label',
        statusLabel(model.get('status'), model.get('comment_created')),
        {silent: true}
      );
      
      if (this.fetchedTotal === this.collection.length) {
        this.render();
      }
    },
    render: function() {
      this.$el.html(this.template({
        comments: this.collection.toJSON(),
        i18n: i18n
      }));
    },
    updateDisplayContent: function(index) {
      var model       = this.collection.at(index),
          timeLabel   = model.get('status_label'),
          commentText = model.get('comments_en');
      
      this.$el.children()
              .children()
              .children('.selected-revision-label')
              .text(timeLabel);
      this.$el.children()
              .children('.version-description-text')
              .text(commentText);
    }


  });


  return RevisionView;
});

