  {{#if_eq model.media_type compare='Picture' }}
    <img src="{{model.media_thumb_file}}"
         class="media-image-thumbnail"/>
         <!--alt="{{model.name_en}}"/>-->
  {{/if_eq}}
  {{#if_eq model.media_type compare='Video' }}
    <img src="{{model.media_thumb_file}}"  
         class="media-image-thumbnail"/>
         <!--alt="{{model.name_en}}"/>-->
  {{/if_eq}}
  <span class="type">{{model.media_type}}</span>
  <span class="date">{{dateFormat model.media_created}}</span>
