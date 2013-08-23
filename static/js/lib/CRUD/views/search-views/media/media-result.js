/*global define, Bootstrap*/
// Author: Cormac McGuire
// ### Description
// display an embedded search result for an media

define (
  [
    'jquery', 'backbone',
    'lib/streams',
    'lib/CRUD/templates/search-templates/media/media-result.tpl',
    'lib/CRUD/templates/search-templates/media/media-viewer.tpl'
  ],
  function ($, Backbone, Streams, mediaResultTmp, mediaViewerTmp) {
    'use strict';

    var MediaResultView,
        crudBus = Streams.crudBus;

    // ### MediaResultView
    // 
    MediaResultView = Backbone.View.extend({
      template: mediaResultTmp,
      tagName: 'li',
      className: 'medium media-result',
      events: {
        'click .do-relate': 'relateToEntity',
        'click .do-remove': 'removeMedia',
        'click .media-image-thumbnail': 'openImageViewer',
        'click .media-video-thumbnail': 'openVideoViewer'
      },
      // constructor
      initialize: function(options) {
        if (options.type === undefined) {
          throw "You must specify a type";
        }
        this.index = options.index;
        this.type = options.type;
        this.render();
      },

      openVideoViewer: function() {
        var video, fileType, fileName, $videoEl;
        video = {};
        fileType = this.model.get('media_file_type');
        fileName = this.model.get('media_file');
        video.mp4 = fileName;

        var previewParent = $('.preview').parent();
        $('.preview').remove();
        previewParent.prepend('<div class="preview"></div>');
        $videoEl = $('.preview');
        $videoEl.flowplayer({
          preload: 'none',
          playlist: [ video ]
        });
      },

      openImageViewer: function() {
        console.log(this.model);
        console.log('openImageViewer');
        var dialogHtml = mediaViewerTmp({
          image: true,
          uri: this.model.get('media_file'),
          alt: this.model.get('name_en')
        });
        this.openDialog($(dialogHtml));
      },

      openDialog: function($dialogHtml) {
        console.log('openDialog');
        $dialogHtml.attr('title', this.model.get('name_en'));
          $dialogHtml.dialog({
            resizable: false,
            //height:    360,
            close: function( event, ui ) {
              $(this).children().remove();              
            },
            modal:     true
          });
      },

      // send a message asking to relate this media to the current  
      // entity being edited
      relateToEntity: function(evt) {
        this.collection.remove(this.model);
        crudBus.push({
          type: 'relate_media_request',
          content: {
            model: this.model
          }
        });
      },

      // remove the media from the current entity
      removeMedia: function(evt) {
        evt.preventDefault();
        this.collection.remove(this.model);
        crudBus.push({
          type: 'unrelate_media_request',
          content: {
            model: this.model
          }
        });
      },
      setExtraClasses: function() {
        if (this.index === 0) {
          this.$el.addClass('REPEAT')
                  .attr('count', this.collection.length);
        }
      },

      resetFlags: function() {
        this.model.unset('selected');
        this.model.unset('result');
      },

      // render the template
      render: function() {
        this.resetFlags();
        this.model.set(this.type, true);
        var templateVars = {
          model: this.model.toJSON(),
        };
        var html = this.template(templateVars);
        this.$el.append(html);
        this.setExtraClasses();
      }
    });

    return MediaResultView;
    
});
