  {{#if_eq model.media_type compare='Picture' }}
    <img src="{{model.media_thumb_file}}"
         title="{{model.name_en}}"
         class="media-image-thumbnail"/>
         <!--alt="{{model.name_en}}"/>-->
  {{/if_eq}}
  {{#if_eq model.media_type compare='Video' }}
    <!--<img src="{{model.media_thumb_file}}"  -->
         <!--class="media-video-thumbnail"-->
         <!--/>-->
    <span aria-hidden="true" data-icon="&#x56;" class="media-video-thumbnail"></span>
    <span class="screen-reader-text">Document</span>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Document' }}
    <span title="{{model.name_en}}" aria-hidden="true" data-icon="F" class="media-document-thumbnail"></span>
    <span class="screen-reader-text">Document</span>
  {{/if_eq}}
  <span class="type">{{model.media_type}}</span>
  <span class="date">{{dateFormat model.media_created}}</span>
