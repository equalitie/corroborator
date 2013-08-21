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
      <div class="assigned-to">
        <span class="value">{{model.incident_assigned_user}}</span>
      </div>
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      {{#if model.most_recent_status_incident}}
      <span class="status">
        <span class="value">{{model.most_recent_status_incident}}</span>
      </span>
      {{/if}}

      <div class="date-location">
        <span class="date">{{dateFormat model.incident_created}}</span>
        {{#if model.location}}
        , in <span class="location">{{model.location}}</span>
        {{/if}}
      </div>

      {{#if model.times}}
      <div class="events detail">
      </div>
      {{/if}}


    </div>
    {{#if model.incident_labels}}
    <ul class="tags group detail">
      {{#each model.incident_labels}}
      <li class="tag"> <span class="text">{{this}}</span> </li>
      {{/each}}
    </ul>
    {{/if}}
  </div>

  <div class="body">
      {{#if model.incident_locations}}
        <div class="incident-map map detail"></div>
      {{/if}}
    <div class="media detail">
      <div class="placeholder">&nbsp;</div>
    </div>
    {{#if model.incident_details_en }}
    <div class="description detail">
      <h3 class="title">Description</h3>
      {{model.incident_details_en}}
    </div>
    {{/if}}
    {{#if model.incident_comments}}
    <div class="comments detail">
    </div>
    {{/if}}
    <!-- end comments -->
    {{#if model.actors_role}}
    <div class="actors group detail">
    </div>
    {{/if}}
    {{#if model.ref_incidents}}
      <div class="incidents group detail">
      </div>
    {{/if}}
    {{#if model.ref_bulletins}}
    <div class="bulletins group detail">
    </div>
    {{/if}}
  </div>
