<div class="actions">
  <button class="do-remove-event is-small">
    <span aria-hidden="true" data-icon="&#x58;"></span>
    <span class="screen-reader-text">{{i18n.event.Remove}}</span>
  </button>

  <button class="do-edit-event is-small">
    <span aria-hidden="true" data-icon="e"></span>
    <span class="screen-reader-text">{{i18n.Edit}}</span>
  </button>

</div>
<div class="content">
  <div class="name"><b>{{model.event_name_en}}</b></div>
  <div class="name"><b>{{model.event_name_ar}}</b></div>
  <div class="name">{{model.comments_en}}</div>
  <div class="name">{{model.comments_ar}}</div>
  <div class="time">
  {{#if model.time_from}}
    {{#if model.time_to}}
      {{i18n.event.from}} 
    {{/if}}
  {{/if}}
  {{#if model.time_from}}
    <span class="start">{{dateFormat model.time_from}}</span>
  {{/if}}
  {{#if model.time_from}}
    {{#if model.time_to}}
     {{i18n.event.to}} 
    {{/if}}
  {{/if}}
  {{#if model.time_to}}
    <span class="end">{{dateFormat model.time_to}}</span>
  {{/if}}
  </div>
</div>
<div class="clearer">&nbsp;</div>
