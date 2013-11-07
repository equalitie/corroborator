<li class="REPEAT">
  <div class="Bulletin in-list">
    <div class="L1">
      <div class="meta">
        <div class="score">
          <span class="value">{{model.confidence_score}}</span>
        </div>
        {{#if model.most_recent_status_bulletin}}
        <span class="status">
          <span class="value">{{model.most_recent_status_bulletin}}</span>
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
        <span class="date">{{dateFormat model.bulletin_created}}</span>
        {{#if model.bulletin_locations}}
          {{i18n.bulletins.in}} 
          <span class="location">
            {{commaSeparatedList model.bulletin_locations}}
          </span>
        {{/if}}
      </div>
      {{#if model.count_actors}}
      <div class="involved">
        <span class="actors-count">{{model.count_actors}}</span> {{i18n.bulletins.actors_involved}}
      </div>
      {{/if}}
    </div>
  </div>
</li>
