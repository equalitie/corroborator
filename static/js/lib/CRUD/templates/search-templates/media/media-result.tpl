<div title="{{model.name_en}}">
  {{#if_eq model.media_type compare='Picture' }}
    <img src="{{model.media_thumb_file}}"
         class="media-image-thumbnail"
         />
  {{/if_eq}}
  {{#if_eq model.media_type compare='Video' }}
    <!--<img src="{{model.media_thumb_file}}"  -->
         <!--class="media-video-thumbnail"-->
         <!--/>-->
    <span aria-hidden="true" data-icon="&#x56;" class="media-video-thumbnail"></span>
    <span class="screen-reader-text">Document</span>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Document' }}
    <span aria-hidden="true" data-icon="F" class="media-document-thumbnail"></span>
    <span class="screen-reader-text">Document</span>
  {{/if_eq}}
  <span class="type">{{model.media_type}}</span>
  <span class="date">{{dateFormat model.media_created}}</span>
  {{#if model.result}}
    <button class="do-relate right is-small">
      <span class="text">relate</span>
    </button>
  {{/if}}
  {{#if model.selected}}
    <button class="do-remove is-small">
      <span class="text">remove</span>
    </button>
  {{/if}}
</div>
