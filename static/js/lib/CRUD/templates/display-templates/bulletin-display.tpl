<div class="Bulletin in-view">
  <div class="header">
    <span class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </span>
    <h2 class="title">
      {{#if model.title_en}}
        <p>{{model.title_en}}</p>
      {{/if}}
      {{#if model.title_ar}}
        <p>{{model.title_ar}}</p>
      {{/if}}
    </h2>
    <div class="group details">
      {{#if model.assigned_user}}
      <div class="assigned-to">
        <span class="value">{{fetchUser model.assigned_user}}</span>
      </div>
      {{/if}}
      {{#if model.confidence_score}}
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      {{/if}}
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
         {{i18n.bulletin.in}} <span class="location">{{commaSeparatedList model.bulletin_locations}}</span>
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
      <h3 class="title">{{i18n.bulletin.Description}}</h3>
      {{model.description_en}}
    </div>
    {{/if}}
    {{#if model.description_ar }}
    <div class="description detail">
      <h3 class="title">{{i18n.bulletin.Description}}</h3>
      {{model.description_ar}}
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
    {{#if model.bulletin_imported_comments}}
    <div class="is-comments group">
    </div>
    {{/if}}
  </div>
</div>
