<div class="Bulletin in-view">
  <div class="header">
    <span class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </span>
    <h2 class="title">
      <span class="i18n with-en with-ar">
        <span lang="en">{{model.title_en}}</span>
        <span lang="ar">{{model.title_ar}}</span>
        <span class="toggle"><span lang="en">EN</span><span lang="ar">AR</span></span></span></h2>
    <div class="group details">
      {{#if model.assigned_user}}
      <div class="assigned-to">
        <span class="value">{{fetchUser model.assigned_user}}</span>
      </div>
      {{/if}}
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      {{#if model.most_recent_status_bulletin}}
      <span class="status">
        <span class="value">{{model.most_recent_status_bulletin}}</span>
      </span>
      {{/if}}
      {{#if model.times}}
      <div class="events detail">
      </div>
      {{/if}}
      <div class="date-location">
        <span class="date">{{dateFormat model.bulletin_created}}</span>
        {{#if model.bulletin_locations}}
         in <span class="location">{{commaSeparatedList model.bulletin_locations}}</span>
        {{/if}}
      </div>
      {{#if model.bulletin_sources}}
      <div class="sources">
          ({{commaSeparatedList model.bulletin_sources}})
      </div>
      {{/if}}
    </div>
    <ul class="tags group detail">
      {{#each model.bulletin_labels}}
      <li class="tag">
      <span class="text">{{this}}</span>
      </li>
      {{/each}}
    </ul>
  </div>
  <div class="body">
    {{#if model.locations}}
    <div class="bulletin-map map detail"></div>
    {{/if}}
    <div class="media">
      <div class="placeholder">&nbsp;</div>
    </div>
    {{#if model.description_en }}
    <div class="description detail">
      <h3 class="title">Description</h3>
      {{model.description_en}}
    </div>
    {{/if}}
    {{#if model.actors_role}}
    <div class="actors group">
    </div>
    {{/if}}
    {{#if model.ref_incidents}}
    <div class="incidents group">
    </div>
    {{/if}}
    {{#if model.ref_bulletins}}
    <div class="bulletins group">
    </div>
    {{/if}}
  </div>
</div>
