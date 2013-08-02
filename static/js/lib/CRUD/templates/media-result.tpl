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
