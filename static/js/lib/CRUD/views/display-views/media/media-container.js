/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a list of media files with a preview box

define (
  [
    'jquery', 'backbone', 'lib/Data/media', 
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/media/media.tpl',
    'lib/CRUD/templates/display-templates/media/media-container.tpl',
    'lib/CRUD/templates/search-templates/media/media-viewer.tpl'
  ],
  function ($, Backbone, Media, CollectionViews, mediaTmp, mediaListTmp,
    mediaViewerTmp) {
    'use strict';

    var ListLoadView = CollectionViews.ListLoadView,
        ModelView = CollectionViews.ModelView,
        MediaListView, MediaView,
        MediaModel = Media.MediaModel;


    // show a single media element
    MediaView = ModelView.extend({
      tagName: 'li',
      className: 'medium REPEAT',
      template: mediaTmp,
      initialize: function() {
        this.render();
        this.$el.tooltip();
      },
      events: {
        'click .media-image-thumbnail'   : 'previewImage',
        'click .media-video-thumbnail'   : 'previewMedia',
        'click .media-document-thumbnail': 'previewFile'
      },
      previewMedia: function() {
        this.model.trigger('previewMedia', this.model);
      },
      previewImage: function() {
        var dialogHtml = mediaViewerTmp({
          image: true,
          uri: this.model.get('media_file'),
          alt: this.model.get('name_en')
        });
        this.openDialog($(dialogHtml));
      },
      previewFile: function() {
        console.log(this.model.toJSON());
        var dialogHtml = mediaViewerTmp({
          file: true,
          model: this.model.toJSON()
        });
        this.openDialog($(dialogHtml));
      },

      openDialog: function($dialogHtml) {
        $dialogHtml.attr('title', this.model.get('name_en'));
          $dialogHtml.dialog({
            resizable: false,
            close: function( event, ui ) {
              $(this).children().remove();              
            },
            modal: true
          });
      },
    });

    // show a list of media elements with a preview
    MediaListView = ListLoadView.extend({
      childViews: [],
      modelType: MediaModel,
      childView: MediaView,
      fieldType: 'media',
      containerTmp: mediaListTmp,

      initialize: function(options) {
        this.render();
        this.collection = new Backbone.Collection();
        this.loadFromList(options.content);
        this.listenTo(this.collection, 'previewMedia', this.previewMedia.bind(this));
      },
      previewMedia: function(model) {
        $('.is-media.group').children('.preview')
                            .remove();
        $('.is-media.group').prepend('<div class="preview"></div>');
        var video, fileType, fileName;
        video = {};
        fileType = model.get('media_file_type');
        fileType = 'mp4';
        fileName = model.get('media_file');
        video[fileType] = fileName;
        
        this.$el.children('.preview').flowplayer({
          preload: 'none',
          playlist: [
            [ video ]
          ]
        });
      },
      onDestroy: function() {
        this.destroyChildren();
        this.stopListening();
      }
    });

    return MediaListView;
});

