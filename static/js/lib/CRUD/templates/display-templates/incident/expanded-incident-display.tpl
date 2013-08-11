<div class="Incident in-view is-expanded">
  <div class="header">
    <span class="id">
      ID <span class="value out">{{model.django_id}}</span>
    </span>
    <h2 class="title">
    <span class="i18n with-en with-ar">
    <span lang="en" class="text">{{model.title_en}}</span>
    <span lang="ar" class="text">{{model.title_ar}}</span>
    <span class="toggle"><span lang="en">EN</span><span lang="ar">AR</span></span></span></h2>
  </div>
  <div class=" span-66p">
    <div class="body">
      {{#if model.incident_crimes}}
      <div class="is-crimes group">
        <h4>Crimes</h4>
        <ul class="crimes">
          {{#each model.incident_crimes}}
          <li class="crime">
            <span class="text">{{this}}</span>
          </li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      {{#if model.description_en}}
      <div class="is-description group">
        <h4>Description</h4>
        <div class="description">{{model.description_en}}</div>
      </div>
      {{/if}}
      {{#if model.incident_comments}}
      <div class="comments group">
      </div>
      {{/if}}
      {{#if model.actors_role}}
      <div class="is-actors group">
      </div>
      {{/if}}
      {{#if model.ref_bulletins}}
      <div class="is-bulletins group">
      </div>
      {{/if}}
      {{#if model.ref_incidents}}
      <div class="is-incidents group">
      </div>
      {{/if}}
    </div>
  </div>
  <div class="last span-33p">
    <div class="body">
      <div class="group">
        <div class="is-score group">
          <h4>Confidence</h4>
          <div class="score">
            <span class="value">{{model.confidence_score}}</span>
          </div>
        </div>
        {{#if most_recent_status_incident.[0]}}
        <div class="is-status group">
          <h4>Update status</h4>
          <div class="status">
            <span class="value">{{most_recent_status_incident.[0]}}</span>
          </div>
        </div>
        {{/if}}
        <div class="is-assigned-to group">
          <h4>Assigned to</h4>
          <div class="assigned-to">
            {{#if model.assigned_user}}
            <span class="value">{{fetchUser model.assigned_user}}</span>
            {{else}}
            <span class="value">Unassigned</span>
            {{/if}}
          </div>
        </div>
        <div class="clearer"></div>
      </div>
      {{#if model.times}}
      <div class="is-events group">
      </div>
      {{/if}}
      {{#if model.incident_locations}}
      <div class="is-locations group">
        <h4>Locations</h4>
        <div class="locations">
          <div class="map"></div>
          {{#each model.incident_locations}}
          <div class="location">{{this}}</div>
          {{/each}}
        </div>
      </div>
      {{/if}}
      {{#if model.incident_labels}}
      <div class="is-tags group">
        <h4>Labels</h4>
        <ul class="tags">
          {{#each model.incident_labels}}
          <li class="tag">
            <span class="text">{{this}}</span>
          </li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      <div class="is-history group">
      </div>
    </div>
  </div>
  <div class="clearer"></div>
</div>
