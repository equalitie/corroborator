<li class="REPEAT">
  <div class="Bulletin in-list">
    <div class="L1">
      <div class="meta">
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
      </div>
      <a href="#bulletin/{{model.id}}/{{expanded}}">
        <div class="title i18n">
          {{#if model.title_en}}
            <p>{{model.title_en}}</p>
          {{/if}}
          {{#if model.title_ar}}
            <p>{{model.title_ar}}</p>
          {{/if}}
        </div>
      </a>
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
