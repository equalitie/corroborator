/*global define*/
// Author: Cormac McGuire
// ### Description
// Display a list of media files with a preview box

define (
  [
    'jquery', 'backbone', 'lib/Data/media', 
    'lib/elements/views/CollectionViews',
    'lib/CRUD/templates/display-templates/media/media.tpl',
    'lib/CRUD/templates/display-templates/media/media-container.tpl'
  ],
  function ($, Backbone, Media, CollectionViews, mediaTmp, mediaListTmp) {
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
      events: {
        'click': 'previewMedia'
      },
      previewMedia: function() {
        console.log('previewMedia');
        this.model.trigger('previewMedia', this.model);
      }
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
        console.log(model.toJSON());
        video = {};
        fileType = model.get('media_file_type');
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

