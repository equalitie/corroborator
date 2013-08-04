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
      <div class="assigned-to">
        <span class="value">{{model.bulletin_assigned_user}}</span>
      </div>
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      {{#if model.bulletin_status}}
      <div class="status">
        <span class="value">{{model.bulletin_status}}</span>
      </div>
      {{/if}}
      <div class="date-location">
        <span class="date">{{dateFormat model.bulletin_created}}</span>
        {{#if model.bulletin_location}}
        , in <span class="location">{{model.bulletin_location}}</span>
        {{/if}}
      </div>
      <div class="sources">
        (<span class="source">BBC</span>, <span class="source">Al-Jazeerah</span>)
      </div>
    </div>
    <ul class="tags group">
      <li class="tag">
      <span class="text">Lorem</span>
      </li>
      <li class="tag">
      <span class="text">Ipsum</span>
      </li>
    </ul>
  </div>
  <div class="body">
    <div class="media">
      <div class="placeholder">&nbsp;</div>
    </div>
    <div class="description">{{model.description}}</div>
    <div class="actors group">
      <h3>Related actors</h3>
      <ul class="elements">
      </ul>
    </div>
    <div class="incidents group">
      <h3>Incidents</h3>
      <ul class="elements">
      </ul>
    </div>
    <div class="bulletins group">
      <h3>Bulletins</h3>
      <ul class="elements">
      </ul>
    </div>
  </div>
</div>
