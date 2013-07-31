<div class="Incident in-list">
  <div class="L1">
    <div class="meta">
      <div class="score">
        <span class="value">{{model.confidence_score}}</span>
      </div>
      <div class="status">
        <span class="value">{{model.status}}</span>
      </div>
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
      <span class="date">{{dateFormat model.incident_created}}</span> in <span class="location">Damas, Syriah</span>
    </div>
  </div>
</div>
