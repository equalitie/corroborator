<div title="Media Viewer">
  {{#if_eq model.media_type compare='Picture' }}
    <img src="{{model.media_thumb_file}}"
         class="media-image-thumbnail"
         alt="{{model.name_en}}"/>
  {{/if_eq}}
  {{#if_eq model.media_type compare='Video' }}
    <img src="{{model.media_thumb_file}}"  
         class="media-video-thumbnail"
         alt="{{model.name_en}}"/>
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
