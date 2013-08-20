<li count="5" class="REPEAT">
  <div class="Incident in-list">
    <div class="L1">
      <div class="meta">
        <div class="score">
          <span class="value">{{model.confidence_score}}</span>
        </div>
        {{#if model.most_recent_status_incident}}
        <span class="status">
          <span class="value">{{model.most_recent_status_incident}}</span>
        </span>
        {{/if}}
      </div>
      <div class="title i18n">
         
        <span lang="en">{{model.title_en}}</span>
        <span lang="ar">{{model.title_ar}}</span>
        <span class="toggle">
          <span lang="en">EN</span><span lang="ar">AR</span>
        </span>
      </div>
    </div>
    <div class="L3">
      <div class="date-location">
        <span class="date">{{dateFormat model.incident_created}}</span>
        {{#if model.incident_location}}
        in <span class="location">Damas, Syriah</span>
        {{/if}}
      </div>
    </div>
  </div>
</li>
