<div class="actions">
  <button class="do-edit is-small">
  <span class="text T">Edit</span>
  </button>
  <button class="do-remove is-small">
  <span class="text T">Remove</span>
  </button>
</div>
<div class="content">
  <div class="name">{{model.event_name_en}}</div>
  <div class="time">
  {{#if model.time_from}}
    {{#if model.time_to}}
      from 
    {{/if}}
  {{/if}}
  {{#if model.time_from}}
    <span class="start">{{dateFormat model.time_from}}</span>
  {{/if}}
  {{#if model.time_from}}
    {{#if model.time_to}}
     to 
    {{/if}}
  {{/if}}
  {{#if model.time_to}}
    <span class="end">{{dateFormat model.time_to}}</span>
  {{/if}}
  </div>
</div>
<div class="clearer">&nbsp;</div>
