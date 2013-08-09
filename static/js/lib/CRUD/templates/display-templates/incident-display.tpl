<div class="Incident in-view">
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
      {{#if model.status}}
      <div class="status">
        <span class="value">{{model.status}}</span>
      </div>
      {{/if}}
      <div class="date-location">
        <span class="date">{{dateFormat model.incident_created}}</span>
        {{#if model.location}}
        , in <span class="location">{{model.location}}</span>
        {{/if}}
      </div>

    </div>
    {{#if model.incident_labels}}
    <ul class="tags group">
      {{#each model.incident_labels}}
      <li class="tag"> <span class="text">{{this}}</span> </li>
      {{/each}}
    </ul>
    {{/if}}
  </div>

  <div class="body">
    <div class="media">
      <div class="placeholder">&nbsp;</div>
    </div>
    {{#if model.incident_details_en }}
    <div class="description">
      <h3>Description</h3>
      {{model.incident_details_en}}
    </div>
    {{/if}}
    {{#if model.incident_comments}}
    <div class="comments">
      <h3>Comments</h3>
      <div class="comments-list">
        <div class="comment">
          <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue enim sed lacus congue id feugiat nisl vestibulum. Sed suscipit ipsum vel diam consequa</div>
          <div class="meta-history">
            <span class="date">2013-05-03 15:35</span> by <span class="who">Martin Scholls</span>
          </div>
        </div>
      </div>
    </div>
    {{/if}}
    <!-- end comments -->
    {{#if model.actors_role}}
      <div class="actors group">
        <h3>Related actors</h3>
        <ul class="elements">
        </ul>
      </div>
    {{/if}}
    {{#if model.ref_incidents}}
      <div class="incidents group">
        <h3>Incidents</h3>
        <ul class="elements">
        </ul>
      </div>
    {{/if}}
    {{#if model.ref_bulletins}}
    <div class="bulletins group">
      <h3>Bulletins</h3>
      <ul class="elements">
      </ul>
    </div>
    {{/if}}
  </div>
</div>
