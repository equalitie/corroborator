<span class="type">{{model.type}}</span>
<span class="date">{{dateFormat model.date}}</span>
{{#if model.result}}
  <button class="do-relate is-small">
    <span class="text">relate</span>
  </button>
{{/if}}
{{#if model.selected}}
  <button class="do-remove is-small">
    <span class="text">remove</span>
  </button>
{{/if}}
