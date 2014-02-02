<li class="event">
  <div class="content">
    <div class="name">{{model.event_name_en}}</div>
    <div class="name">{{model.event_name_ar}}</div>
    <div class="time">
      {{#if model.time_from}}
      {{#if model.time_to}}
      {{i18n.events.from}}
      {{/if}}
      {{/if}}
      {{#if model.time_from}}
      <span class="start">{{dateFormat model.time_from}}</span>
      {{/if}}
      {{#if model.time_from}}
      {{#if model.time_to}}
      {{i18n.events.to}}
      {{/if}}
      {{/if}}
      {{#if model.time_to}}
      <span class="end">{{dateFormat model.time_to}}</span>
      {{/if}}
    </div>
  </div>
  <div class="clearer"></div>
</li>

