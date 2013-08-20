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
      {{#if model.bulletin_assigned_user}}
      <div class="assigned-to">
        <span class="value">{{model.bulletin_assigned_user}}</span>
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
      <div class="events">
        
      </div>
      <div class="date-location">
        <span class="date">{{dateFormat model.bulletin_created}}</span>
        {{#if model.bulletin_location}}
        , in <span class="location">{{model.bulletin_location}}</span>
        {{/if}}
      </div>
      {{#if model.bulletin_locations}}
      <div class="sources">
          ({{commaSeparatedList model.bulletin_locations}})
      </div>
      {{/if}}
    </div>
    <ul class="tags group">
      {{#each model.bulletin_labels}}
      <li class="tag">
      <span class="text">{{this}}</span>
      </li>
      {{/each}}
    </ul>
  </div>
  <div class="body">
    <div class="media">
      <div class="placeholder">&nbsp;</div>
    </div>
    <div class="description">{{model.description}}</div>
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
