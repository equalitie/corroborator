<div>
{{#if video}}
<div class="flowplayer">
  <video>
    <source type="video" src="{{uri}}">
  </video>
</div>
{{/if}}
{{#if image}}
<img src="{{uri}}" alt="{{alt}}" />
{{/if}}
</div>
